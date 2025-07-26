// Secure blog functionality with DOM-based rendering
(function() {
    'use strict';

    // Helper function to safely create text nodes and avoid XSS
    function createTextElement(tag, text, className = '', attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        
        // Set attributes safely
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'href') {
                // Validate URLs for security
                try {
                    new URL(value);
                    element.setAttribute(key, value);
                } catch {
                    console.warn('Invalid URL blocked:', value);
                }
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (text) element.textContent = text;
        return element;
    }

    // Helper function to create post elements safely
    function renderPost(post, options = {}) {
        const { featured = false } = options;
        const articleClass = featured ? 'featured-post' : 'post-card';
        const article = createTextElement('article', '', articleClass);
        
        if (!featured) {
            article.setAttribute('data-tags', post.tags.join(',').toLowerCase());
        }

        const postContent = createTextElement('div', '', 'post-content');
        
        // Post meta
        const postMeta = createTextElement('div', '', 'post-meta');
        
        const dateSpan = createTextElement('span', '', 'post-date');
        dateSpan.appendChild(createTextElement('i', '', 'fas fa-calendar'));
        dateSpan.appendChild(document.createTextNode(' ' + post.date));
        
        const timeSpan = createTextElement('span', '', 'post-read-time');
        timeSpan.appendChild(createTextElement('i', '', 'fas fa-clock'));
        timeSpan.appendChild(document.createTextNode(' ' + post.readTime));
        
        postMeta.appendChild(dateSpan);
        postMeta.appendChild(timeSpan);
        
        // Post title with link
        const titleH3 = createTextElement('h3', '', 'post-title');
        const titleLink = createTextElement('a', post.title, '', {
            href: post.url,
            target: '_blank'
        });
        titleH3.appendChild(titleLink);
        
        // Post excerpt
        const excerpt = createTextElement('p', post.excerpt, 'post-excerpt');
        
        // Post tags
        const tagsDiv = createTextElement('div', '', 'post-tags');
        post.tags.forEach(tag => {
            const tagSpan = createTextElement('span', tag, 'post-tag');
            tagsDiv.appendChild(tagSpan);
        });
        
        // Read more link
        const readMore = createTextElement('a', '', 'read-more', {
            href: post.url,
            target: '_blank'
        });
        readMore.appendChild(document.createTextNode('Read on Medium '));
        readMore.appendChild(createTextElement('i', '', 'fas fa-external-link-alt'));
        
        // Assemble the post
        postContent.appendChild(postMeta);
        postContent.appendChild(titleH3);
        postContent.appendChild(excerpt);
        postContent.appendChild(tagsDiv);
        postContent.appendChild(readMore);
        
        article.appendChild(postContent);
        return article;
    }

    function loadFeaturedPosts() {
        const container = document.getElementById('featured-posts');
        if (!container) return;
        
        // Clear container safely
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        const featuredPosts = getFeaturedPosts();
        featuredPosts.forEach(post => {
            container.appendChild(renderPost(post, { featured: true }));
        });
    }

    function loadAllPosts(filteredPosts = null) {
        const container = document.getElementById('all-posts');
        if (!container) return;
        
        // Clear container safely
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        const posts = filteredPosts || getRecentPosts();
        posts.forEach(post => {
            container.appendChild(renderPost(post));
        });
    }

    function setupFilters() {
        const filterButtons = document.querySelectorAll('.tag-filter');
        const allPostsButton = document.querySelector('.filter-all');
        
        // Show all posts
        if (allPostsButton) {
            allPostsButton.addEventListener('click', () => {
                loadAllPosts();
                updateActiveFilter(allPostsButton);
            });
        }
        
        // Filter by tag
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tag = button.getAttribute('data-tag');
                if (tag) {
                    const filteredPosts = getPostsByTag(tag);
                    loadAllPosts(filteredPosts);
                    updateActiveFilter(button);
                }
            });
        });
    }

    function updateActiveFilter(activeButton) {
        document.querySelectorAll('.tag-filter, .filter-all').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    function setupNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(emailInput.value)) {
                    showNotification('Thanks for subscribing! (Demo mode)', 'success');
                    emailInput.value = '';
                } else {
                    showNotification('Please enter a valid email address', 'error');
                }
            }
        });
    }

    // Inject notification styles safely
    function injectNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn { 
                from { transform: translateX(100%); opacity: 0; } 
                to { transform: translateX(0); opacity: 1; } 
            }
            .notification-content { 
                display: flex; 
                align-items: center; 
                gap: 0.5rem; 
            }
            .notification-close { 
                background: none; 
                border: none; 
                cursor: pointer; 
                margin-left: auto;
                color: inherit;
            }
        `;
        document.head.appendChild(style);
    }

    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = createTextElement('div', '', `notification notification-${type}`);
        
        const content = createTextElement('div', '', 'notification-content');
        
        // Icon based on type
        const iconClass = type === 'success' ? 'fa-check-circle' : 
                         type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        const icon = createTextElement('i', '', `fas ${iconClass}`);
        
        const messageSpan = createTextElement('span', message);
        
        const closeButton = createTextElement('button', '', 'notification-close');
        closeButton.appendChild(createTextElement('i', '', 'fas fa-times'));
        
        content.appendChild(icon);
        content.appendChild(messageSpan);
        content.appendChild(closeButton);
        notification.appendChild(content);
        
        // Set styles safely
        const bgColor = type === 'success' ? 'var(--highlight-color)' :
                       type === 'error' ? '#ff4757' : 'var(--accent-color)';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: var(--primary-color);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        closeButton.addEventListener('click', () => notification.remove());
        setTimeout(() => notification.remove(), 5000);
    }

    function initTypingAnimation() {
        const element = document.querySelector('.typing-text');
        if (!element) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--highlight-color)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize everything
    function initBlog() {
        injectNotificationStyles();
        loadFeaturedPosts();
        loadAllPosts();
        setupFilters();
        setupNewsletterForm();
        setTimeout(initTypingAnimation, 1000);
        setupSmoothScroll();
    }

    // Single DOMContentLoaded listener
    document.addEventListener('DOMContentLoaded', initBlog);

})();

