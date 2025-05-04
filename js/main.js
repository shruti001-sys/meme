// Store liked and saved memes in localStorage
let likedMemes = JSON.parse(localStorage.getItem('likedMemes')) || {};
let savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || {};

// DOM Elements
const memeGrid = document.querySelector('.memes-grid');
const uploadBtn = document.querySelector('.upload-btn');
const uploadModal = document.querySelector('.upload-modal');
const closeModal = document.querySelector('.close-modal');
const fileInput = document.getElementById('fileInput');
const uploadArea = document.querySelector('.upload-area');
const submitUpload = document.querySelector('.submit-upload');
const tagsInput = document.querySelector('.tags-input input');
const tagsContainer = document.querySelector('.tags-container');

// Meme data array - all memes from the folder
const memeData = [
    { id: 1, image: 'memes/meme1.jpg' },
    { id: 2, image: 'memes/meme2.jpg' },
    { id: 3, image: 'memes/meme3.jpg' },
    { id: 4, image: 'memes/meme4.jpg' },
    { id: 5, image: 'memes/meme5.jpg' },
    { id: 6, image: 'memes/meme6.jpg' },
    { id: 7, image: 'memes/meme7.jpg' },
    { id: 8, image: 'memes/meme8.jpg' },
    { id: 9, image: 'memes/meme9.jpg' },
    { id: 10, image: 'memes/IMG-20250326-WA0011 - Copy.jpg' },
    { id: 11, image: 'memes/IMG-20250326-WA0012.jpg' },
    { id: 12, image: 'memes/IMG-20250326-WA0013.jpg' },
    { id: 13, image: 'memes/IMG-20250326-WA0014.jpg' },
    { id: 14, image: 'memes/IMG-20250326-WA0015.jpg' },
    { id: 15, image: 'memes/IMG-20250326-WA0016.jpg' },
    { id: 16, image: 'memes/IMG-20250326-WA0017.jpg' },
    { id: 17, image: 'memes/IMG-20250326-WA0018.jpg' },
    { id: 18, image: 'memes/IMG-20250326-WA0019.jpg' },
    { id: 19, image: 'memes/IMG-20250326-WA0020.jpg' },
    { id: 20, image: 'memes/IMG-20250326-WA0022.jpg' },
    { id: 21, image: 'memes/IMG-20250326-WA0023.jpg' },
    { id: 22, image: 'memes/IMG-20250326-WA0024.jpg' },
    { id: 23, image: 'memes/IMG-20250326-WA0025.jpg' },
    { id: 24, image: 'memes/IMG-20250326-WA0026.jpg' },
    { id: 25, image: 'memes/IMG-20250326-WA0027.jpg' },
    { id: 26, image: 'memes/IMG-20250326-WA0028.jpg' },
    { id: 27, image: 'memes/IMG-20250326-WA0029.jpg' },
    { id: 28, image: 'memes/IMG-20250326-WA0030.jpg' },
    { id: 29, image: 'memes/IMG-20250326-WA0031.jpg' },
    { id: 30, image: 'memes/IMG-20250326-WA0032.jpg' },
    { id: 31, image: 'memes/IMG-20250326-WA0034.jpg' },
    { id: 32, image: 'memes/IMG-20250326-WA0035.jpg' },
    { id: 33, image: 'memes/IMG-20250326-WA0036.jpg' },
    { id: 34, image: 'memes/IMG-20250326-WA0037.jpg' },
    { id: 35, image: 'memes/IMG-20250326-WA0038.jpg' },
    { id: 36, image: 'memes/IMG-20250326-WA0039.jpg' },
    { id: 37, image: 'memes/IMG-20250326-WA0040.jpg' },
    { id: 38, image: 'memes/IMG-20250326-WA0041.jpg' },
    { id: 39, image: 'memes/IMG-20250326-WA0042.jpg' },
    { id: 40, image: 'memes/IMG-20250326-WA0043.jpg' },
    { id: 41, image: 'memes/IMG-20250326-WA0046.jpg' },
    { id: 42, image: 'memes/IMG-20250326-WA0047.jpg' },
    { id: 43, image: 'memes/IMG-20250326-WA0048.jpg' },
    { id: 44, image: 'memes/IMG-20250326-WA0049.jpg' },
    { id: 45, image: 'memes/IMG-20250326-WA0050.jpg' },
    { id: 46, image: 'memes/IMG-20250326-WA0051.jpg' }
];

// Initialize the meme grid
function initializeMemeGrid() {
    memeGrid.innerHTML = ''; // Clear existing content
    
    memeData.forEach(meme => {
        const memeCard = createMemeCard(meme);
        memeGrid.appendChild(memeCard);
    });
}

// Create a meme card element
function createMemeCard(meme) {
    const div = document.createElement('div');
    div.className = 'meme-card';
    const isLiked = likedMemes[meme.image]?.liked || false;
    const isSaved = savedMemes[meme.image] || false;
    
    div.innerHTML = `
        <div class="meme-image-container">
            <img src="${meme.image}" alt="Meme ${meme.id}" class="meme-image" onerror="this.src='https://via.placeholder.com/400'">
            <div class="meme-overlay">
                <div class="meme-actions">
                    <button class="action-button like-button ${isLiked ? 'active' : ''}" data-tooltip="Like" data-id="${meme.id}" data-image="${meme.image}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-button save-button ${isSaved ? 'active' : ''}" data-tooltip="Save" data-id="${meme.id}" data-image="${meme.image}">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="action-button share-button" data-tooltip="Share" data-id="${meme.id}" data-image="${meme.image}">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="meme-info">
            <h3 class="meme-title">Meme ${meme.id}</h3>
            <div class="meme-author">
                <img src="https://via.placeholder.com/32" alt="Author" class="author-avatar">
                <span>@username</span>
            </div>
        </div>
    `;
    
    return div;
}

// Upload Modal Functionality
uploadBtn.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

// Close modal when clicking outside
uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
        uploadModal.style.display = 'none';
    }
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// Browse files functionality
document.querySelector('.browse-btn').addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Handle uploaded files
function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            // Preview the image
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px;">
                    <p>Click to change image</p>
                `;
            };
            reader.readAsDataURL(file);

            // Save the file to the memes folder
            saveMemeFile(file);
        } else {
            alert('Please upload an image file');
        }
    }
}

// Save meme file
async function saveMemeFile(file) {
    const formData = new FormData();
    formData.append('meme', file);

    try {
        const response = await fetch('/upload-meme', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Refresh the meme grid
            memeGrid.innerHTML = '';
            initializeMemeGrid();
            uploadModal.style.display = 'none';
        }
    } catch (error) {
        console.error('Error uploading meme:', error);
        alert('Failed to upload meme. Please try again.');
    }
}

// Handle meme interactions
document.addEventListener('click', (e) => {
    const button = e.target.closest('.action-button');
    if (!button) return;
    
    const memeImage = button.dataset.image;
    
    if (button.classList.contains('like-button')) {
        handleLike(button, memeImage);
    } else if (button.classList.contains('save-button')) {
        handleSave(button, memeImage);
    } else if (button.classList.contains('share-button')) {
        handleShare(memeImage);
    }
});

// Handle like functionality
function handleLike(button, memeImage) {
    const icon = button.querySelector('i');
    const isLiked = button.classList.contains('active');
    
    if (!likedMemes[memeImage]) {
        likedMemes[memeImage] = { liked: false, likes: 0 };
    }
    
    if (isLiked) {
        likedMemes[memeImage].likes--;
        likedMemes[memeImage].liked = false;
        button.classList.remove('active');
        icon.style.color = '#fff';
    } else {
        likedMemes[memeImage].likes++;
        likedMemes[memeImage].liked = true;
        button.classList.add('active');
        icon.style.color = '#FF1744';
    }
    
    localStorage.setItem('likedMemes', JSON.stringify(likedMemes));
}

// Handle save functionality
function handleSave(button, memeImage) {
    const icon = button.querySelector('i');
    const isSaved = button.classList.contains('active');
    
    if (isSaved) {
        delete savedMemes[memeImage];
        button.classList.remove('active');
        icon.style.color = '#fff';
    } else {
        savedMemes[memeImage] = true;
        button.classList.add('active');
        icon.style.color = '#FF1744';
    }
    
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));
}

// Handle share functionality
function handleShare(memeImage) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this meme!',
            text: 'Found this awesome meme on VibeMeme',
            url: window.location.origin + '/' + memeImage
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const tempInput = document.createElement('input');
        tempInput.value = window.location.origin + '/' + memeImage;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Meme link copied to clipboard!');
    }
}

// Initialize the grid when the page loads
document.addEventListener('DOMContentLoaded', initializeMemeGrid);

document.addEventListener('DOMContentLoaded', () => {
    // Category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    const memeCards = document.querySelectorAll('.meme-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');

            const category = card.dataset.category;
            
            // Filter memes based on category
            memeCards.forEach(meme => {
                if (category === 'all' || meme.dataset.category === category) {
                    meme.style.display = 'block';
                } else {
                    meme.style.display = 'none';
                }
            });
        });
    });

    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const icon = button.querySelector('i');
            if (button.classList.contains('active')) {
                icon.style.color = '#FF1744';
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.style.color = '#fff';
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // Share button functionality
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const memeCard = button.closest('.meme-card');
            const memeImage = memeCard.querySelector('img');
            
            // Create share data
            const shareData = {
                title: 'Check out this meme!',
                text: 'Shared from MemeHub',
                url: memeImage.src
            };

            // Use Web Share API if available
            if (navigator.share) {
                navigator.share(shareData)
                    .catch(error => console.log('Error sharing:', error));
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(memeImage.src)
                    .then(() => {
                        alert('Meme link copied to clipboard!');
                    })
                    .catch(error => console.log('Error copying:', error));
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        memeCards.forEach(meme => {
            const memeTitle = meme.querySelector('img').alt.toLowerCase();
            if (memeTitle.includes(searchTerm)) {
                meme.style.display = 'block';
            } else {
                meme.style.display = 'none';
            }
        });
    });

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Restore liked and saved states
    const likeButtons = document.querySelectorAll('.like-button');
    const saveButtons = document.querySelectorAll('.save-button');
    
    likeButtons.forEach(button => {
        const memeImage = button.dataset.image;
        if (likedMemes[memeImage]?.liked) {
            button.classList.add('active');
            button.querySelector('i').style.color = '#FF1744';
        }
    });
    
    saveButtons.forEach(button => {
        const memeImage = button.dataset.image;
        if (savedMemes[memeImage]) {
            button.classList.add('active');
            button.querySelector('i').style.color = '#FF1744';
        }
    });
}); 