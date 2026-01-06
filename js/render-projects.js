/**
 * Dynamic Projects Renderer
 * Renders projects from projects-data.js into the projects grid
 * This script works with the auto-generated projects-data.js file
 */

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    // Check if grid exists and data is loaded
    if (!projectsGrid) {
        console.warn('Projects grid element not found');
        return;
    }
    
    if (!window.projectsData || window.projectsData.length === 0) {
        console.warn('Projects data not available');
        projectsGrid.innerHTML = '<p>No projects available</p>';
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
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Select gradient based on index
        const gradient = gradients[index % gradients.length];
        const icon = languageIcons[project.language] || '📦';
        
        // Format description (truncate if too long)
        const description = project.description.length > 120 
            ? project.description.substring(0, 120) + '...' 
            : project.description;
        
        // Build tech tags (limit to 3)
        const techTags = [project.language];
        if (project.topics && project.topics.length > 0) {
            techTags.push(...project.topics.slice(0, 2));
        }
        
        const techTagsHTML = techTags
            .map(tag => `<span class="tech-tag">${tag}</span>`)
            .join('');
        
        // Build project links
        let projectLinks = `<a href="${project.url}" target="_blank" class="project-link" title="View on GitHub"><i class="fab fa-github"></i></a>`;
        if (project.homepage) {
            projectLinks += `<a href="${project.homepage}" target="_blank" class="project-link" title="Visit Website"><i class="fas fa-globe"></i></a>`;
        }
        
        projectCard.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder" style="background: ${gradient};">
                    <div class="project-language">${icon} ${project.language}</div>
                </div>
                <div class="project-overlay">
                    <div class="project-links">
                        ${projectLinks}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.name}</h3>
                <p>${description}</p>
                <div class="project-meta">
                    <span class="project-stats">
                        <i class="fas fa-star"></i> ${project.stars}
                        <i class="fas fa-code-branch"></i> ${project.forks}
                    </span>
                    <span class="project-updated">Updated: ${project.updated}</span>
                </div>
                <div class="project-tech">
                    ${techTagsHTML}
                </div>
            </div>
        `;
        
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
