// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load blog posts
    loadFeaturedPosts();
    loadAllPosts();
    
    // Set up filter functionality
    setupFilters();
    
    // Set up newsletter form
    setupNewsletterForm();
});

function loadFeaturedPosts() {
    const featuredContainer = document.getElementById('featured-posts');
    if (!featuredContainer) return;
    
    const featuredPosts = getFeaturedPosts();
    
    featuredContainer.innerHTML = featuredPosts.map(post => `
        <article class="featured-post">
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-date">
                        <i class="fas fa-calendar"></i>
                        ${post.date}
                    </span>
                    <span class="post-read-time">
                        <i class="fas fa-clock"></i>
                        ${post.readTime}
                    </span>
                </div>
                <h3 class="post-title">
                    <a href="${post.url}" target="_blank">${post.title}</a>
                </h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                </div>
                <a href="${post.url}" target="_blank" class="read-more">
                    Read on Medium <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </article>
    `).join('');
}

function loadAllPosts(filteredPosts = null) {
    const postsContainer = document.getElementById('all-posts');
    if (!postsContainer) return;
    
    const posts = filteredPosts || getRecentPosts();
    
    postsContainer.innerHTML = posts.map(post => `
        <article class="post-card" data-tags="${post.tags.join(',').toLowerCase()}">
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-date">
                        <i class="fas fa-calendar"></i>
                        ${post.date}
                    </span>
                    <span class="post-read-time">
                        <i class="fas fa-clock"></i>
                        ${post.readTime}
                    </span>
                </div>
                <h3 class="post-title">
                    <a href="${post.url}" target="_blank">${post.title}</a>
                </h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                </div>
                <a href="${post.url}" target="_blank" class="read-more">
                    Read on Medium <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </article>
    `).join('');
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.tag-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const tag = this.getAttribute('data-tag');
            
            if (tag === 'all') {
                loadAllPosts();
            } else {
                const filteredPosts = getPostsByTag(tag);
                loadAllPosts(filteredPosts);
            }
        });
    });
}

function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.email-input');
    const subscribeBtn = newsletterForm?.querySelector('.btn');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate subscription (in real implementation, this would call an API)
        subscribeBtn.textContent = 'Subscribing...';
        subscribeBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thanks for subscribing! Check out my Medium profile for the latest posts.', 'success');
            emailInput.value = '';
            subscribeBtn.textContent = 'Subscribe';
            subscribeBtn.disabled = false;
            
            // Redirect to Medium profile
            setTimeout(() => {
                window.open('https://medium.com/@TheRealFREDP3D', '_blank');
            }, 2000);
        }, 1500);
    });
    
    // Handle button click
    subscribeBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        newsletterForm.dispatchEvent(new Event('submit'));
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--highlight-color)' : type === 'error' ? '#ff4757' : 'var(--accent-color)'};
        color: var(--primary-color);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            margin-left: auto;
            padding: 0.2rem;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Set up close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Typing animation for blog title
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTypingAnimation, 1000);
});

// Smooth scroll for footer links
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-links a[data-tag]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tag = this.getAttribute('data-tag');
            
            // Scroll to all posts section
            const allPostsSection = document.querySelector('.all-posts');
            if (allPostsSection) {
                allPostsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Filter posts after scroll
                setTimeout(() => {
                    const filterButton = document.querySelector(`[data-tag="${tag}"]`);
                    if (filterButton) {
                        filterButton.click();
                    }
                }, 800);
            }
        });
    });
});

