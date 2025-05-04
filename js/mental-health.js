// Get DOM elements
const wellnessToggle = document.getElementById('wellnessToggle');
const mentalHealthContainer = document.getElementById('mentalHealthContainer');
const wellnessSidebar = document.querySelector('.wellness-sidebar');
const moodOptions = document.querySelectorAll('.mood-option');
const affirmationDisplay = document.querySelector('.affirmation-display');

// Affirmations for different moods
const affirmations = {
    happy: [
        "Your happiness is contagious! Keep spreading those positive vibes!",
        "You're making the world a better place with your smile!",
        "Your joy is well-deserved and beautiful to see!",
        "You're radiating positivity today!"
    ],
    sad: [
        "It's okay to feel sad. You're strong enough to get through this.",
        "Your feelings are valid, and better days are ahead.",
        "You're not alone in this. We're here for you.",
        "This moment is temporary. You've got this!"
    ],
    anxious: [
        "Take a deep breath. You're safe in this moment.",
        "Your anxiety doesn't define you. You're so much more.",
        "You have the strength to face whatever comes your way.",
        "One step at a time. You're doing great!"
    ],
    angry: [
        "Your feelings are valid. Take a moment to breathe.",
        "It's okay to feel angry. What matters is how you handle it.",
        "You have the power to choose your response.",
        "This feeling will pass. You're in control."
    ],
    neutral: [
        "Every day is a new opportunity for growth.",
        "You're exactly where you need to be right now.",
        "Your journey is unique and valuable.",
        "You have the power to create positive change."
    ]
};

// Toggle mental health container
wellnessToggle.addEventListener('click', () => {
    mentalHealthContainer.classList.toggle('active');
    wellnessToggle.classList.toggle('active');
});

// Handle mood selection
moodOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        moodOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked option
        option.classList.add('active');
        
        // Get the mood from data attribute
        const mood = option.getAttribute('data-mood');
        // Get random affirmation for the selected mood
        const randomAffirmation = affirmations[mood][Math.floor(Math.random() * affirmations[mood].length)];
        
        // Update the display with animation
        affirmationDisplay.style.opacity = '0';
        setTimeout(() => {
            affirmationDisplay.textContent = randomAffirmation;
            affirmationDisplay.style.opacity = '1';
        }, 300);
    });
});

// Mobile toggle for wellness sidebar
const toggleSidebarButton = document.createElement('button');
toggleSidebarButton.className = 'mobile-wellness-toggle';
toggleSidebarButton.innerHTML = '<i class="fas fa-brain"></i>';
document.body.appendChild(toggleSidebarButton);

toggleSidebarButton.addEventListener('click', () => {
    wellnessSidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!wellnessSidebar.contains(e.target) && !toggleSidebarButton.contains(e.target)) {
            wellnessSidebar.classList.remove('active');
        }
    }
});

// Add hover effect to tip cards
const tipCards = document.querySelectorAll('.tip-card');
tipCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 