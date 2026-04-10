// Enhanced Blog JavaScript with Medium-inspired features

class BlogManager {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.init();
    }

    async init() {
        await this.loadPosts();
        this.renderFeaturedPosts();
        this.renderAllPosts();
        this.setupEventListeners();
        this.updateStats();
    }

    async loadPosts() {
        // Use the existing blog-data.js
        this.posts = blogPosts || [];
        this.filteredPosts = [...this.posts];
    }

    renderFeaturedPosts() {
        const featuredContainer = document.getElementById('featured-posts');
        if (!featuredContainer) return;

        const featuredPosts = this.posts.filter(post => post.featured);
        
        featuredContainer.innerHTML = featuredPosts.map(post => this.createPostCard(post, true)).join('');
    }

    renderAllPosts() {
        const postsContainer = document.getElementById('all-posts');
        if (!postsContainer) return;

        postsContainer.innerHTML = this.filteredPosts.map(post => this.createPostCard(post, false)).join('');
    }

    createPostCard(post, isFeatured = false) {
        const formattedDate = this.formatDate(post.date);
        const tagElements = post.tags.map(tag => 
            `<span class="post-tag" data-tag="${tag}">${tag}</span>`
        ).join('');

        const isLocal = post.local || false;
        const linkText = isLocal ? "Read Article" : "Read on Medium";
        const linkIcon = isLocal ? "fas fa-arrow-right" : "fas fa-external-link-alt";
        const linkTarget = isLocal ? "" : 'target="_blank" rel="noopener noreferrer"';

        return `
            <article class="post-card ${isFeatured ? 'featured' : ''}" data-post-id="${post.id}">
                <div class="post-meta">
                    <div class="post-date">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="post-read-time">
                        <i class="fas fa-clock"></i>
                        <span>${post.readTime}</span>
                    </div>
                    ${isLocal ? '<div class="post-local-badge"><i class="fas fa-home"></i><span>Local Article</span></div>' : ''}
                </div>
                
                <h3 class="post-title">${post.title}</h3>
                
                <p class="post-excerpt">${post.excerpt}</p>
                
                <div class="post-tags">
                    ${tagElements}
                </div>
                
                <a href="${post.url}" ${linkTarget} class="post-link">
                    ${linkText}
                    <i class="${linkIcon}"></i>
                </a>
            </article>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.tag-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tag = e.target.dataset.tag;
                this.filterPosts(tag);
                this.updateActiveFilter(e.target);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Tag clicks in posts
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('post-tag')) {
                const tag = e.target.dataset.tag;
                this.filterPosts(tag);
                // Find matching filter button or clear active state
                const matchingButton = document.querySelector(`.tag-filter[data-tag="${tag}"]`);
                this.updateActiveFilter(matchingButton);
            }
        });

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            const emailInput = newsletterForm.querySelector('.email-input');
            const subscribeBtn = newsletterForm.querySelector('.btn');
            
            subscribeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(emailInput.value);
            });

            emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleNewsletterSignup(emailInput.value);
                }
            });
        }

        // Smooth scrolling for anchor links
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

        // Add reading progress indicator
        this.setupReadingProgress();
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase().trim();
        
        if (this.searchQuery === '') {
            this.filteredPosts = this.currentFilter === 'all' 
                ? [...this.posts] 
                : this.posts.filter(post => 
                    post.tags.some(postTag => 
                        postTag.toLowerCase() === this.currentFilter.toLowerCase()
                    )
                );
        } else {
            this.filteredPosts = this.posts.filter(post => {
                const matchesSearch = post.title.toLowerCase().includes(this.searchQuery) ||
                                    post.excerpt.toLowerCase().includes(this.searchQuery) ||
                                    post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
                
                if (this.currentFilter === 'all') {
                    return matchesSearch;
                } else {
                    const matchesFilter = post.tags.some(postTag => 
                        postTag.toLowerCase() === this.currentFilter.toLowerCase()
                    );
                    return matchesSearch && matchesFilter;
                }
            });
        }
        
        this.renderAllPosts();
        this.animatePostCards();
    }

    filterPosts(tag) {
        this.currentFilter = tag;
        
        if (tag === 'all') {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => 
                post.tags.some(postTag => 
                    postTag.toLowerCase() === tag.toLowerCase()
                )
            );
        }
        
        this.renderAllPosts();
        this.animatePostCards();
    }

    updateActiveFilter(activeButton) {
        // Remove active class from all buttons
        document.querySelectorAll('.tag-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    animatePostCards() {
        const cards = document.querySelectorAll('.post-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    updateStats() {
        const totalPosts = this.posts.length;
        const totalReads = this.calculateTotalReads();
        const totalClaps = this.calculateTotalClaps();

        // Update stats in the header
        const statsElements = document.querySelectorAll('.stat-item span');
        if (statsElements.length >= 3) {
            statsElements[0].textContent = `${totalPosts} Articles`;
            statsElements[1].textContent = `${totalReads}+ Reads`;
            statsElements[2].textContent = `${totalClaps}+ Claps`;
        }
    }

    calculateTotalReads() {
        // Simulate read counts based on article age and popularity
        return Math.floor(Math.random() * 2000) + 1000;
    }

    calculateTotalClaps() {
        // Simulate clap counts
        return Math.floor(Math.random() * 500) + 100;
    }

    handleNewsletterSignup(email) {
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate newsletter signup
        this.showNotification('Thanks for subscribing! Check your email for confirmation.', 'success');
        
        // Clear the input
        const emailInput = document.querySelector('.email-input');
        if (emailInput) {
            emailInput.value = '';
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 150, 255, 0.1)'};
            border: 1px solid ${type === 'success' ? 'rgba(0, 255, 0, 0.3)' : type === 'error' ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 150, 255, 0.3)'};
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
            font-family: 'Inter', sans-serif;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    setupReadingProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-accent);
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// Initialize hover effects after posts are rendered
function addHoverEffects() {
    // Add particle effects on hover for post cards
    document.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.setProperty('--mouse-x', '50%');
            this.style.setProperty('--mouse-y', '50%');
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            this.style.setProperty('--mouse-x', x + '%');
            this.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// Initialize hover effects after BlogManager renders posts
document.addEventListener('DOMContentLoaded', () => {
    // Wait for BlogManager to finish rendering
    setTimeout(addHoverEffects, 500);
});

