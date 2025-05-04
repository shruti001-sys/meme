document.addEventListener('DOMContentLoaded', function() {
    // Initialize meme interactions
    initializeMemeInteractions();
});

function initializeMemeInteractions() {
    // Get all meme cards
    const memeCards = document.querySelectorAll('.meme-card');
    
    memeCards.forEach(card => {
        // Like button functionality
        const likeBtn = card.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleLike(this);
            });
        }

        // Save button functionality
        const saveBtn = card.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleSave(this);
            });
        }

        // Share button functionality
        const shareBtn = card.querySelector('.share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleShare(this, card.querySelector('img').src);
            });
        }
    });
}

function handleLike(button) {
    const countElement = button.querySelector('.action-count');
    const currentCount = parseInt(countElement.textContent);
    
    // Toggle active state
    button.classList.toggle('active');
    
    // Update count
    if (button.classList.contains('active')) {
        countElement.textContent = currentCount + 1;
        // Add animation
        button.classList.add('liked');
        setTimeout(() => button.classList.remove('liked'), 1000);
    } else {
        countElement.textContent = currentCount - 1;
    }
    
    // Save to localStorage
    const memeId = button.closest('.meme-card').dataset.memeId;
    saveLikeState(memeId, button.classList.contains('active'));
}

function handleSave(button) {
    const memeCard = button.closest('.meme-card');
    const memeId = memeCard.dataset.memeId;
    
    // Toggle active state
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
        // Show saved notification
        showNotification('Meme saved to your collection!');
        // Add animation
        button.classList.add('saved');
        setTimeout(() => button.classList.remove('saved'), 1000);
    } else {
        showNotification('Meme removed from your collection');
    }
    
    // Save to localStorage
    saveMemeState(memeId, button.classList.contains('active'));
}

function handleShare(button, imageUrl) {
    if (navigator.share) {
        // Use Web Share API if available
        navigator.share({
            title: 'Check out this meme!',
            text: 'I found this funny meme on VibeMeme',
            url: imageUrl
        }).catch(error => {
            console.error('Error sharing:', error);
            fallbackShare(imageUrl);
        });
    } else {
        fallbackShare(imageUrl);
    }
}

function fallbackShare(imageUrl) {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = imageUrl;
    document.body.appendChild(tempInput);
    
    // Select and copy the URL
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Show notification
    showNotification('Image URL copied to clipboard!');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function saveLikeState(memeId, isLiked) {
    const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
    likedMemes[memeId] = isLiked;
    localStorage.setItem('likedMemes', JSON.stringify(likedMemes));
}

function saveMemeState(memeId, isSaved) {
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes') || '{}');
    savedMemes[memeId] = isSaved;
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));
}

// Load saved states when page loads
function loadSavedStates() {
    const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes') || '{}');
    
    // Apply liked states
    Object.entries(likedMemes).forEach(([memeId, isLiked]) => {
        const memeCard = document.querySelector(`.meme-card[data-meme-id="${memeId}"]`);
        if (memeCard) {
            const likeBtn = memeCard.querySelector('.like-btn');
            if (likeBtn && isLiked) {
                likeBtn.classList.add('active');
                const countElement = likeBtn.querySelector('.action-count');
                countElement.textContent = parseInt(countElement.textContent) + 1;
            }
        }
    });
    
    // Apply saved states
    Object.entries(savedMemes).forEach(([memeId, isSaved]) => {
        const memeCard = document.querySelector(`.meme-card[data-meme-id="${memeId}"]`);
        if (memeCard) {
            const saveBtn = memeCard.querySelector('.save-btn');
            if (saveBtn && isSaved) {
                saveBtn.classList.add('active');
            }
        }
    });
}

// Initialize saved states when page loads
document.addEventListener('DOMContentLoaded', loadSavedStates); 