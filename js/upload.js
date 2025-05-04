// Handle meme uploads
function handleMemeUpload(event) {
    event.preventDefault();
    
    if (!isLoggedIn()) {
        alert('Please log in to upload memes');
        return;
    }
    
    const fileInput = document.getElementById('meme-file');
    const titleInput = document.getElementById('meme-title');
    const file = fileInput.files[0];
    const title = titleInput.value;
    
    if (!file || !title) {
        alert('Please provide both an image and a title');
        return;
    }
    
    // Create a new meme object
    const newMeme = {
        id: Date.now(),
        title: title,
        imageUrl: URL.createObjectURL(file),
        author: currentUser.username,
        authorAvatar: 'https://via.placeholder.com/32',
        likes: 0,
        saves: 0,
        timestamp: new Date().toISOString()
    };
    
    // Add to user's memes
    currentUser.memes.push(newMeme);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Add to main feed
    addMemeToFeed(newMeme);
    
    // Close upload modal
    closeUploadModal();
    
    // Reset form
    fileInput.value = '';
    titleInput.value = '';
}

// Add meme to feed
function addMemeToFeed(meme) {
    const memesGrid = document.querySelector('.memes-grid');
    if (!memesGrid) return;
    
    const memeCard = createMemeCard(meme);
    memesGrid.insertBefore(memeCard, memesGrid.firstChild);
}

// Create meme card HTML
function createMemeCard(meme) {
    const card = document.createElement('div');
    card.className = 'meme-card';
    card.innerHTML = `
        <div class="meme-image-container">
            <img src="${meme.imageUrl}" alt="${meme.title}" class="meme-image">
            <div class="meme-overlay">
                <div class="meme-actions">
                    <button class="action-button like-button" data-tooltip="Like" data-id="${meme.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-button save-button" data-tooltip="Save" data-id="${meme.id}">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="action-button share-button" data-tooltip="Share" data-id="${meme.id}">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="meme-info">
            <h3 class="meme-title">${meme.title}</h3>
            <div class="meme-author">
                <img src="${meme.authorAvatar}" alt="${meme.author}" class="author-avatar">
                <span>@${meme.author}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Get DOM elements
const uploadModal = document.querySelector('.upload-modal');
const uploadForm = document.getElementById('upload-form');
const cancelBtn = document.querySelector('.cancel-btn');

// Show upload modal
function showUploadModal() {
    uploadModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Hide upload modal
function hideUploadModal() {
    uploadModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    uploadForm.reset(); // Reset form
}

// Event listeners
document.querySelector('.upload-btn').addEventListener('click', showUploadModal);
cancelBtn.addEventListener('click', hideUploadModal);

// Close modal when clicking outside
uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
        hideUploadModal();
    }
});

// Handle form submission
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(uploadForm);
    const title = formData.get('title');
    const image = formData.get('image');
    const description = formData.get('description');

    try {
        // Here you would typically send the data to your server
        // For now, we'll just log it and show a success message
        console.log('Uploading meme:', { title, image, description });
        
        // Simulate successful upload
        alert('Meme uploaded successfully!');
        hideUploadModal();
    } catch (error) {
        console.error('Error uploading meme:', error);
        alert('Failed to upload meme. Please try again.');
    }
});