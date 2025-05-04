document.addEventListener('DOMContentLoaded', function() {
    // Get the category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'struggles';

    // Update page title and header based on category
    updateCategoryInfo(category);

    // Load memes for the category
    loadCategoryMemes(category);

    // Handle filter buttons
    setupFilters();
});

function updateCategoryInfo(category) {
    const categoryInfo = {
        struggles: {
            title: 'Struggles Memes',
            description: 'Relatable moments that make us laugh through our daily challenges',
            icon: 'fa-sad-tear'
        },
        movies: {
            title: 'Movies & TV Shows Memes',
            description: 'The best memes from your favorite movies and TV shows',
            icon: 'fa-film'
        },
        tech: {
            title: 'Tech & Programming',
            description: 'Humor for developers and tech enthusiasts',
            icon: 'fa-code'
        },
        // Add more categories as needed
    };

    const info = categoryInfo[category] || categoryInfo.struggles;
    
    document.title = `${info.title} - VibeMeme`;
    document.querySelector('.category-info h1').textContent = info.title;
    document.querySelector('.category-info p').textContent = info.description;
}

function loadCategoryMemes(category) {
    const memesGrid = document.querySelector('.memes-grid');
    memesGrid.innerHTML = ''; // Clear existing memes

    // Create an array of all meme files
    const allMemes = [
        // Original memes
        { url: 'memes/meme1.jpg', title: 'Meme 1', likes: 1200, views: 5000, date: Date.now() },
        { url: 'memes/meme2.jpg', title: 'Meme 2', likes: 800, views: 3000, date: Date.now() - 86400000 },
        { url: 'memes/meme3.jpg', title: 'Meme 3', likes: 1500, views: 7000, date: Date.now() - 172800000 },
        { url: 'memes/meme4.jpg', title: 'Meme 4', likes: 900, views: 4000, date: Date.now() - 259200000 },
        { url: 'memes/meme5.jpg', title: 'Meme 5', likes: 1100, views: 4500, date: Date.now() - 345600000 },
        { url: 'memes/meme6.jpg', title: 'Meme 6', likes: 700, views: 2500, date: Date.now() - 432000000 },
        { url: 'memes/meme7.jpg', title: 'Meme 7', likes: 1300, views: 5500, date: Date.now() - 518400000 },
        { url: 'memes/meme8.jpg', title: 'Meme 8', likes: 1000, views: 3500, date: Date.now() - 604800000 },
        { url: 'memes/meme9.jpg', title: 'Meme 9', likes: 850, views: 2800, date: Date.now() - 691200000 },
        
        // WhatsApp memes
        { url: 'memes/IMG-20250326-WA0051.jpg', title: 'WhatsApp Meme 1', likes: 950, views: 3200, date: Date.now() - 777600000 },
        { url: 'memes/IMG-20250326-WA0050.jpg', title: 'WhatsApp Meme 2', likes: 1050, views: 3800, date: Date.now() - 864000000 },
        { url: 'memes/IMG-20250326-WA0049.jpg', title: 'WhatsApp Meme 3', likes: 1150, views: 4200, date: Date.now() - 950400000 },
        { url: 'memes/IMG-20250326-WA0048.jpg', title: 'WhatsApp Meme 4', likes: 750, views: 2200, date: Date.now() - 1036800000 },
        { url: 'memes/IMG-20250326-WA0047.jpg', title: 'WhatsApp Meme 5', likes: 1250, views: 4800, date: Date.now() - 1123200000 },
        { url: 'memes/IMG-20250326-WA0046.jpg', title: 'WhatsApp Meme 6', likes: 850, views: 2600, date: Date.now() - 1209600000 },
        { url: 'memes/IMG-20250326-WA0043.jpg', title: 'WhatsApp Meme 7', likes: 1350, views: 5200, date: Date.now() - 1296000000 },
        { url: 'memes/IMG-20250326-WA0042.jpg', title: 'WhatsApp Meme 8', likes: 650, views: 1800, date: Date.now() - 1382400000 },
        { url: 'memes/IMG-20250326-WA0041.jpg', title: 'WhatsApp Meme 9', likes: 1450, views: 5800, date: Date.now() - 1468800000 },
        { url: 'memes/IMG-20250326-WA0040.jpg', title: 'WhatsApp Meme 10', likes: 550, views: 1500, date: Date.now() - 1555200000 },
        { url: 'memes/IMG-20250326-WA0039.jpg', title: 'WhatsApp Meme 11', likes: 1550, views: 6200, date: Date.now() - 1641600000 },
        { url: 'memes/IMG-20250326-WA0038.jpg', title: 'WhatsApp Meme 12', likes: 450, views: 1200, date: Date.now() - 1728000000 },
        { url: 'memes/IMG-20250326-WA0037.jpg', title: 'WhatsApp Meme 13', likes: 1650, views: 6800, date: Date.now() - 1814400000 },
        { url: 'memes/IMG-20250326-WA0036.jpg', title: 'WhatsApp Meme 14', likes: 350, views: 900, date: Date.now() - 1900800000 },
        { url: 'memes/IMG-20250326-WA0035.jpg', title: 'WhatsApp Meme 15', likes: 1750, views: 7200, date: Date.now() - 1987200000 },
        { url: 'memes/IMG-20250326-WA0034.jpg', title: 'WhatsApp Meme 16', likes: 250, views: 600, date: Date.now() - 2073600000 },
        { url: 'memes/IMG-20250326-WA0032.jpg', title: 'WhatsApp Meme 17', likes: 1850, views: 7800, date: Date.now() - 2160000000 },
        { url: 'memes/IMG-20250326-WA0031.jpg', title: 'WhatsApp Meme 18', likes: 150, views: 400, date: Date.now() - 2246400000 },
        { url: 'memes/IMG-20250326-WA0030.jpg', title: 'WhatsApp Meme 19', likes: 1950, views: 8200, date: Date.now() - 2332800000 },
        { url: 'memes/IMG-20250326-WA0029.jpg', title: 'WhatsApp Meme 20', likes: 50, views: 200, date: Date.now() - 2419200000 },
        { url: 'memes/IMG-20250326-WA0028.jpg', title: 'WhatsApp Meme 21', likes: 2050, views: 8800, date: Date.now() - 2505600000 },
        { url: 'memes/IMG-20250326-WA0027.jpg', title: 'WhatsApp Meme 22', likes: 25, views: 100, date: Date.now() - 2592000000 },
        { url: 'memes/IMG-20250326-WA0026.jpg', title: 'WhatsApp Meme 23', likes: 2150, views: 9200, date: Date.now() - 2678400000 },
        { url: 'memes/IMG-20250326-WA0025.jpg', title: 'WhatsApp Meme 24', likes: 10, views: 50, date: Date.now() - 2764800000 },
        { url: 'memes/IMG-20250326-WA0024.jpg', title: 'WhatsApp Meme 25', likes: 2250, views: 9800, date: Date.now() - 2851200000 },
        { url: 'memes/IMG-20250326-WA0023.jpg', title: 'WhatsApp Meme 26', likes: 5, views: 25, date: Date.now() - 2937600000 },
        { url: 'memes/IMG-20250326-WA0022.jpg', title: 'WhatsApp Meme 27', likes: 2350, views: 10200, date: Date.now() - 3024000000 },
        { url: 'memes/IMG-20250326-WA0020.jpg', title: 'WhatsApp Meme 28', likes: 2, views: 10, date: Date.now() - 3110400000 },
        { url: 'memes/IMG-20250326-WA0019.jpg', title: 'WhatsApp Meme 29', likes: 2450, views: 10800, date: Date.now() - 3196800000 },
        { url: 'memes/IMG-20250326-WA0018.jpg', title: 'WhatsApp Meme 30', likes: 1, views: 5, date: Date.now() - 3283200000 },
        { url: 'memes/IMG-20250326-WA0017.jpg', title: 'WhatsApp Meme 31', likes: 2550, views: 11200, date: Date.now() - 3369600000 },
        { url: 'memes/IMG-20250326-WA0016.jpg', title: 'WhatsApp Meme 32', likes: 0, views: 2, date: Date.now() - 3456000000 },
        { url: 'memes/IMG-20250326-WA0015.jpg', title: 'WhatsApp Meme 33', likes: 2650, views: 11800, date: Date.now() - 3542400000 },
        { url: 'memes/IMG-20250326-WA0014.jpg', title: 'WhatsApp Meme 34', likes: 0, views: 1, date: Date.now() - 3628800000 },
        { url: 'memes/IMG-20250326-WA0013.jpg', title: 'WhatsApp Meme 35', likes: 2750, views: 12200, date: Date.now() - 3715200000 },
        { url: 'memes/IMG-20250326-WA0012.jpg', title: 'WhatsApp Meme 36', likes: 0, views: 0, date: Date.now() - 3801600000 },
        { url: 'memes/IMG-20250326-WA0011 - Copy.jpg', title: 'WhatsApp Meme 37', likes: 2850, views: 12800, date: Date.now() - 3888000000 }
    ];

    // Shuffle the memes array for random display
    const shuffledMemes = allMemes.sort(() => Math.random() - 0.5);

    // Display all memes
    shuffledMemes.forEach(meme => {
        const memeCard = createMemeCard(meme);
        memesGrid.appendChild(memeCard);
    });

    // Update category stats
    updateCategoryStats(shuffledMemes.length);
}

function updateCategoryStats(memeCount) {
    const statsContainer = document.querySelector('.category-stats');
    statsContainer.innerHTML = `
        <span><i class="fas fa-image"></i> ${memeCount} Memes</span>
        <span><i class="fas fa-eye"></i> ${memeCount * 1000} Views</span>
        <span><i class="fas fa-users"></i> ${Math.floor(memeCount * 0.5)} Followers</span>
    `;
}

function createMemeCard(meme) {
    const card = document.createElement('div');
    card.className = 'meme-card';
    
    // Add data attributes for filtering
    card.dataset.likes = meme.likes || 0;
    card.dataset.views = meme.views || 0;
    card.dataset.date = meme.date || Date.now();
    
    card.innerHTML = `
        <div class="meme-image-container">
            <img src="${meme.url}" alt="${meme.title}" loading="lazy">
            <div class="meme-overlay">
                <div class="meme-actions">
                    <button class="action-btn like-btn" data-tooltip="Like">
                        <i class="fas fa-heart"></i>
                        <span class="action-count">${meme.likes || 0}</span>
                    </button>
                    <button class="action-btn share-btn" data-tooltip="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="action-btn save-btn" data-tooltip="Save">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="meme-info">
            <div class="meme-stats">
                <span class="stat-item">
                    <i class="fas fa-eye"></i>
                    ${meme.views || 0}
                </span>
                <span class="stat-item">
                    <i class="fas fa-clock"></i>
                    ${formatDate(meme.date)}
                </span>
            </div>
        </div>
    `;

    // Add click event for meme actions
    const actionButtons = card.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            handleMemeAction(button, meme);
        });
    });

    return card;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // Convert to days
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
}

function handleMemeAction(button, meme) {
    const action = button.classList.contains('like-btn') ? 'like' :
                   button.classList.contains('share-btn') ? 'share' : 'save';
    
    button.classList.toggle('active');
    
    if (action === 'like') {
        const countElement = button.querySelector('.action-count');
        const currentCount = parseInt(countElement.textContent);
        countElement.textContent = button.classList.contains('active') ? currentCount + 1 : currentCount - 1;
    }
    
    // Here you would typically make an API call to update the server
    console.log(`${action} action for meme: ${meme.title}`);
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the filter type
            const filter = button.dataset.filter;
            // Apply the filter
            applyFilter(filter);
        });
    });
}

function applyFilter(filter) {
    const memesGrid = document.querySelector('.memes-grid');
    const memes = Array.from(memesGrid.children);
    
    // Sort memes based on filter
    switch(filter) {
        case 'trending':
            memes.sort((a, b) => b.dataset.views - a.dataset.views);
            break;
        case 'newest':
            memes.sort((a, b) => b.dataset.date - a.dataset.date);
            break;
        case 'top':
            memes.sort((a, b) => b.dataset.likes - a.dataset.likes);
            break;
    }
    
    // Clear and re-append sorted memes
    memesGrid.innerHTML = '';
    memes.forEach(meme => memesGrid.appendChild(meme));
}

// Handle follow button
document.querySelector('.follow-btn').addEventListener('click', function() {
    this.classList.toggle('following');
    const isFollowing = this.classList.contains('following');
    this.innerHTML = isFollowing ? 
        '<i class="fas fa-check"></i> Following' : 
        '<i class="fas fa-plus"></i> Follow Category';
});

// Handle share button
document.querySelector('.share-btn').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Show feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    }
}); 