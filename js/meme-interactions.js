// Meme Card Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Get all meme cards
    const memeCards = document.querySelectorAll('.meme-card');

    memeCards.forEach(card => {
        // Get action buttons within each card
        const likeBtn = card.querySelector('.like-button');
        const saveBtn = card.querySelector('.save-button');
        const shareBtn = card.querySelector('.share-button');

        // Like Button
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                likeBtn.classList.toggle('active');
                
                // Add heart beat animation
                const icon = likeBtn.querySelector('i');
                icon.style.animation = 'none';
                icon.offsetHeight; // Trigger reflow
                icon.style.animation = 'heartBeat 0.3s ease';
            });
        }

        // Save Button
        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                saveBtn.classList.toggle('active');
                
                // Add bookmark pop animation
                const icon = saveBtn.querySelector('i');
                icon.style.animation = 'none';
                icon.offsetHeight; // Trigger reflow
                icon.style.animation = 'bookmarkPop 0.3s ease';
            });
        }

        // Share Button
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                shareBtn.classList.toggle('active');
                
                // Add share pop animation
                const icon = shareBtn.querySelector('i');
                icon.style.animation = 'none';
                icon.offsetHeight; // Trigger reflow
                icon.style.animation = 'sharePop 0.3s ease';

                // Get meme data for sharing
                const memeTitle = card.querySelector('.meme-title')?.textContent || 'Check out this meme!';
                const memeImage = card.querySelector('.meme-image')?.src;
                
                // Create share data
                const shareData = {
                    title: memeTitle,
                    text: 'Check out this awesome meme!',
                    url: memeImage
                };

                // Try to use native share API
                if (navigator.share) {
                    navigator.share(shareData)
                        .catch(err => console.log('Error sharing:', err));
                } else {
                    // Fallback to clipboard copy
                    navigator.clipboard.writeText(memeImage)
                        .then(() => {
                            showNotification('Meme link copied to clipboard!');
                        })
                        .catch(err => console.log('Error copying:', err));
                }
            });
        }
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add hover effect for meme cards
document.querySelectorAll('.meme-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}); 