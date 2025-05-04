// DOM Elements
const profilePicture = document.getElementById('profilePicture');
const coverPhoto = document.getElementById('coverPhoto');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const memeCount = document.getElementById('memeCount');
const followerCount = document.getElementById('followerCount');
const followingCount = document.getElementById('followingCount');
const editProfileBtn = document.getElementById('editProfileBtn');
const editProfileModal = document.getElementById('editProfileModal');
const editProfileForm = document.getElementById('editProfileForm');
const cancelEditBtn = document.getElementById('cancelEdit');
const editUsername = document.getElementById('editUsername');
const editBio = document.getElementById('editBio');
const editCoverBtn = document.getElementById('editCoverBtn');
const editProfilePicBtn = document.getElementById('editProfilePicBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const userMemesGrid = document.getElementById('userMemes');
const savedMemesGrid = document.getElementById('savedMemes');
const likedMemesGrid = document.getElementById('likedMemes');

// Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html';
}

const API_URL = 'http://localhost:5000/api';

// Fetch user profile data
async function fetchUserProfile() {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const userData = await response.json();
        updateProfileUI(userData);
        loadUserMemes();
    } catch (error) {
        console.error('Error fetching profile:', error);
        showError('Failed to load profile data');
    }
}

// Update profile UI with user data
function updateProfileUI(userData) {
    username.textContent = userData.username;
    bio.textContent = userData.bio || 'No bio yet';
    memeCount.textContent = userData.memes.length;
    followerCount.textContent = userData.followers.length;
    followingCount.textContent = userData.following.length;
    
    if (userData.profilePicture) {
        profilePicture.src = userData.profilePicture;
    }
    if (userData.coverPhoto) {
        coverPhoto.src = userData.coverPhoto;
    }

    // Set form values
    editUsername.value = userData.username;
    editBio.value = userData.bio || '';
}

// Load user's memes
async function loadUserMemes() {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch memes');
        }

        const userData = await response.json();
        displayMemes(userData.memes, userMemesGrid);
        displayMemes(userData.savedMemes, savedMemesGrid);
        displayMemes(userData.likedMemes, likedMemesGrid);
    } catch (error) {
        console.error('Error loading memes:', error);
        showError('Failed to load memes');
    }
}

// Display memes in grid
function displayMemes(memes, gridElement) {
    gridElement.innerHTML = '';
    memes.forEach(meme => {
        const memeCard = createMemeCard(meme);
        gridElement.appendChild(memeCard);
    });
}

// Create meme card element
function createMemeCard(meme) {
    const card = document.createElement('div');
    card.className = 'meme-card';
    card.innerHTML = `
        <div class="meme-image-container">
            <img src="${meme.imageUrl}" alt="${meme.title}" class="meme-image">
            <div class="meme-overlay">
                <div class="meme-actions">
                    <button class="action-button like-button" data-id="${meme._id}" data-tooltip="Like">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-button save-button" data-id="${meme._id}" data-tooltip="Save">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="action-button share-button" data-id="${meme._id}" data-tooltip="Share">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="meme-info">
            <h3 class="meme-title">${meme.title}</h3>
            <div class="meme-stats">
                <span><i class="fas fa-heart"></i> ${meme.likes}</span>
                <span><i class="fas fa-comment"></i> ${meme.comments.length}</span>
                <span><i class="fas fa-share"></i> ${meme.shares}</span>
            </div>
        </div>
    `;
    return card;
}

// Handle tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        // Update active states
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Show edit profile modal
editProfileBtn.addEventListener('click', () => {
    editProfileModal.style.display = 'block';
});

// Hide edit profile modal
cancelEditBtn.addEventListener('click', () => {
    editProfileModal.style.display = 'none';
});

// Handle profile update
editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username: editUsername.value,
                bio: editBio.value
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const updatedUser = await response.json();
        updateProfileUI(updatedUser);
        editProfileModal.style.display = 'none';
        showSuccess('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        showError('Failed to update profile');
    }
});

// Handle profile picture upload
editProfilePicBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadImage(file, 'profilePicture');
        }
    };
    input.click();
});

// Handle cover photo upload
editCoverBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadImage(file, 'coverPhoto');
        }
    };
    input.click();
});

// Upload image function
async function uploadImage(file, type) {
    try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('type', type);

        const response = await fetch(`${API_URL}/users/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        
        // Update UI
        if (type === 'profilePicture') {
            profilePicture.src = data.url;
        } else if (type === 'coverPhoto') {
            coverPhoto.src = data.url;
        }
        
        showSuccess('Image uploaded successfully!');
    } catch (error) {
        console.error('Error uploading image:', error);
        showError('Failed to upload image');
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Initialize profile
fetchUserProfile(); 