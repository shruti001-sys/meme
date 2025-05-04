// User authentication state
let currentUser = null;

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}

// Login function
function login(username, password) {
    // In a real app, this would make an API call to verify credentials
    // For demo purposes, we'll use a simple check
    if (username && password) {
        currentUser = {
            username: username,
            id: Date.now(), // Simple unique ID
            memes: [] // Array to store user's memes
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        return true;
    }
    return false;
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForLoggededOutUser();
}

// Check login state on page load
function checkLoginState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggededOutUser();
    }
}

// Update UI based on login state
function updateUIForLoggedInUser() {
    // Show profile link
    const profileLink = document.querySelector('.user-profile');
    if (profileLink) {
        profileLink.style.display = 'flex';
    }
    
    // Show upload button
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.style.display = 'flex';
    }
}

function updateUIForLoggededOutUser() {
    // Hide profile link
    const profileLink = document.querySelector('.user-profile');
    if (profileLink) {
        profileLink.style.display = 'none';
    }
    
    // Hide upload button
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.style.display = 'none';
    }
}

// Initialize auth state
document.addEventListener('DOMContentLoaded', checkLoginState); 