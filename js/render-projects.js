/**
 * Dynamic Projects Renderer
 * Renders projects from projects-data.js into the projects grid
 * This script works with the auto-generated projects-data.js file
 * 
 * SECURITY: All user-supplied data is validated and sanitized to prevent XSS
 */

/**
 * Sanitizes HTML entities to prevent XSS attacks
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text with HTML entities escaped
 */
function escapeHTML(text) {
    if (typeof text !== 'string') {
        return '';
    }
    
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Validates and sanitizes a URL to prevent javascript: and data: protocols
 * @param {string} url - URL to validate
 * @param {string} defaultUrl - Default URL if validation fails
 * @returns {string} - Validated URL or default
 */
function validateURL(url, defaultUrl = '#') {
    if (typeof url !== 'string') {
        return defaultUrl;
    }
    
    const trimmedUrl = url.trim().toLowerCase();
    
    // Block dangerous protocols
    if (trimmedUrl.startsWith('javascript:') || 
        trimmedUrl.startsWith('data:') || 
        trimmedUrl.startsWith('vbscript:')) {
        console.warn('Blocked potentially dangerous URL:', url);
        return defaultUrl;
    }
    
    // Allow http, https, and relative URLs
    if (trimmedUrl.startsWith('http://') || 
        trimmedUrl.startsWith('https://') || 
        trimmedUrl.startsWith('/') ||
        trimmedUrl.startsWith('.')) {
        return url;
    }
    
    // Default to https if no protocol specified
    if (!trimmedUrl.includes('://')) {
        return 'https://' + url;
    }
    
    return defaultUrl;
}

/**
 * Validates that a value is a safe string
 * @param {*} value - Value to validate
 * @param {string} defaultValue - Default value if validation fails
 * @returns {string} - Validated string
 */
function validateString(value, defaultValue = '') {
    if (typeof value !== 'string') {
        return defaultValue;
    }
    return value.trim();
}

/**
 * Validates that a value is a safe number
 * @param {*} value - Value to validate
 * @param {number} defaultValue - Default value if validation fails
 * @returns {number} - Validated number
 */
function validateNumber(value, defaultValue = 0) {
    const num = parseInt(value, 10);
    return isNaN(num) ? defaultValue : Math.max(0, num);
}

/**
 * Validates and sanitizes an array of tags
 * @param {*} tags - Tags to validate
 * @param {number} maxTags - Maximum number of tags to allow
 * @returns {array} - Validated tags array
 */
function validateTags(tags, maxTags = 5) {
    if (!Array.isArray(tags)) {
        return [];
    }
    
    return tags
        .filter(tag => typeof tag === 'string' && tag.trim().length > 0)
        .map(tag => validateString(tag))
        .slice(0, maxTags);
}

/**
 * Validates a project object
 * @param {object} project - Project object to validate
 * @returns {object} - Validated project object
 */
function validateProject(project) {
    if (typeof project !== 'object' || project === null) {
        return null;
    }
    
    return {
        name: validateString(project.name, 'Untitled Project'),
        description: validateString(project.description, 'No description available'),
        url: validateURL(project.url, 'https://github.com'),
        homepage: validateURL(project.homepage, ''),
        language: validateString(project.language, 'Unknown'),
        stars: validateNumber(project.stars, 0),
        forks: validateNumber(project.forks, 0),
        topics: validateTags(project.topics, 3),
        updated: validateString(project.updated, 'Unknown'),
    };
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    // Check if grid exists and data is loaded
    if (!projectsGrid) {
        console.warn('Projects grid element not found');
        return;
    }
    
    if (!window.projectsData || !Array.isArray(window.projectsData) || window.projectsData.length === 0) {
        console.warn('Projects data not available or invalid');
        // Use textContent instead of innerHTML to prevent XSS
        projectsGrid.textContent = 'No projects available';
        return;
    }
    
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    // Color palette for project cards
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    ];
    
    // Language to icon mapping
    const languageIcons = {
        'Python': '🐍',
        'JavaScript': '⚡',
        'TypeScript': '📘',
        'Java': '☕',
        'C++': '⚙️',
        'C': '🔧',
        'Go': '🐹',
        'Rust': '🦀',
        'Ruby': '💎',
        'PHP': '🐘',
        'HTML': '🏗️',
        'CSS': '🎨',
        'Shell': '💻',
        'Dockerfile': '🐳',
        'Markdown': '📝',
    };
    
    // Render each project
    window.projectsData.forEach((project, index) => {
        // Validate project data
        const validatedProject = validateProject(project);
        if (!validatedProject) {
            console.warn('Invalid project data at index', index);
            return;
        }
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Select gradient based on index
        const gradient = gradients[index % gradients.length];
        const icon = languageIcons[validatedProject.language] || '📦';
        
        // Format description (truncate if too long)
        const description = validatedProject.description.length > 120 
            ? validatedProject.description.substring(0, 120) + '...' 
            : validatedProject.description;
        
        // Build tech tags (limit to 3)
        const techTags = [validatedProject.language];
        if (validatedProject.topics && validatedProject.topics.length > 0) {
            techTags.push(...validatedProject.topics.slice(0, 2));
        }
        
        // Create image container
        const imageDiv = document.createElement('div');
        imageDiv.className = 'project-image';
        
        const placeholderDiv = document.createElement('div');
        placeholderDiv.className = 'project-placeholder';
        placeholderDiv.style.background = gradient;
        
        const languageDiv = document.createElement('div');
        languageDiv.className = 'project-language';
        // Use textContent for language to prevent XSS
        languageDiv.textContent = `${icon} ${validatedProject.language}`;
        
        placeholderDiv.appendChild(languageDiv);
        
        // Create overlay with links
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'project-overlay';
        
        const linksDiv = document.createElement('div');
        linksDiv.className = 'project-links';
        
        // Create GitHub link
        const githubLink = document.createElement('a');
        githubLink.href = validatedProject.url;
        githubLink.target = '_blank';
        githubLink.rel = 'noopener noreferrer';
        githubLink.className = 'project-link';
        githubLink.title = 'View on GitHub';
        githubLink.innerHTML = '<i class="fab fa-github"></i>';
        linksDiv.appendChild(githubLink);
        
        // Create homepage link if available
        if (validatedProject.homepage) {
            const homepageLink = document.createElement('a');
            homepageLink.href = validatedProject.homepage;
            homepageLink.target = '_blank';
            homepageLink.rel = 'noopener noreferrer';
            homepageLink.className = 'project-link';
            homepageLink.title = 'Visit Website';
            homepageLink.innerHTML = '<i class="fas fa-globe"></i>';
            linksDiv.appendChild(homepageLink);
        }
        
        overlayDiv.appendChild(linksDiv);
        imageDiv.appendChild(placeholderDiv);
        imageDiv.appendChild(overlayDiv);
        
        // Create content section
        const contentDiv = document.createElement('div');
        contentDiv.className = 'project-content';
        
        const titleH3 = document.createElement('h3');
        titleH3.textContent = validatedProject.name;
        
        const descriptionP = document.createElement('p');
        descriptionP.textContent = description;
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'project-meta';
        
        const statsSpan = document.createElement('span');
        statsSpan.className = 'project-stats';
        statsSpan.innerHTML = `<i class="fas fa-star"></i> ${escapeHTML(String(validatedProject.stars))} <i class="fas fa-code-branch"></i> ${escapeHTML(String(validatedProject.forks))}`;
        
        const updatedSpan = document.createElement('span');
        updatedSpan.className = 'project-updated';
        updatedSpan.textContent = `Updated: ${validatedProject.updated}`;
        
        metaDiv.appendChild(statsSpan);
        metaDiv.appendChild(updatedSpan);
        
        // Create tech tags
        const techDiv = document.createElement('div');
        techDiv.className = 'project-tech';
        
        techTags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tech-tag';
            tagSpan.textContent = tag;
            techDiv.appendChild(tagSpan);
        });
        
        contentDiv.appendChild(titleH3);
        contentDiv.appendChild(descriptionP);
        contentDiv.appendChild(metaDiv);
        contentDiv.appendChild(techDiv);
        
        projectCard.appendChild(imageDiv);
        projectCard.appendChild(contentDiv);
        
        projectsGrid.appendChild(projectCard);
    });
    
    console.log(`✓ Rendered ${window.projectsData.length} projects`);
}

// Render projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    renderProjects();
}

// Re-render if projects data is updated dynamically
window.addEventListener('projectsDataUpdated', renderProjects);
