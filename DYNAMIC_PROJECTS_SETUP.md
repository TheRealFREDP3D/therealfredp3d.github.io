# Dynamic Projects Setup Guide

This guide explains how to integrate the automatic project listing feature into your website.

## What's New

Your website now has **automatic project listing** that updates whenever you merge a pull request. Instead of manually editing `index.html` to add new projects, the system will:

1. Detect when a PR is merged
2. Fetch your latest GitHub repositories
3. Generate a data file automatically
4. Update your website

## Files Added

### 1. **Python Script** (`scripts/fetch_repositories.py`)
- Fetches all public repositories from your GitHub account
- Generates `blog/projects-data.js` with repository metadata
- Runs automatically via GitHub Actions

### 2. **GitHub Actions Workflow** (`.github/workflows/update-projects.yml`)
- Triggers on every PR merge to `main` or `master` branch
- Runs the Python script
- Commits changes automatically
- Website rebuilds on GitHub Pages

### 3. **Projects Data File** (`blog/projects-data.js`)
- Auto-generated file containing all your repositories
- Similar structure to `blog-data.js`
- Includes: name, description, URL, language, stars, topics, etc.

## Integration Steps

### Step 1: Update Your HTML

Replace the hardcoded projects section in `index.html` with a dynamic version:

```html
<!-- Projects Section -->
<section id="projects" class="projects">
    <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid" id="projects-grid">
            <!-- Projects will be loaded here dynamically -->
        </div>
    </div>
</section>
```

### Step 2: Add Projects Data Script

Add this line to your `index.html` before your main JavaScript:

```html
<script src="blog/projects-data.js"></script>
```

### Step 3: Add Dynamic Rendering JavaScript

Add a new file `js/render-projects.js`:

```javascript
// Render projects dynamically from projects-data.js
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid || !window.projectsData) {
        console.warn('Projects grid or data not found');
        return;
    }
    
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    // Render each project
    window.projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <div class="project-language">${project.language}</div>
                </div>
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.url}" target="_blank" class="project-link" title="View on GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        ${project.homepage ? `<a href="${project.homepage}" target="_blank" class="project-link" title="Visit Website"><i class="fas fa-globe"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-meta">
                    <span class="project-stars"><i class="fas fa-star"></i> ${project.stars}</span>
                    <span class="project-updated">${project.updated}</span>
                </div>
                <div class="project-tech">
                    <span class="tech-tag">${project.language}</span>
                    ${project.topics.slice(0, 2).map(topic => `<span class="tech-tag">${topic}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Render projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    renderProjects();
}
```

### Step 4: Update Your HTML to Include the Script

Add this line to your `index.html` before the closing `</body>` tag:

```html
<script src="js/render-projects.js"></script>
```

## How It Works

### Workflow Diagram

```
┌─────────────────────────────────────┐
│  You Merge a Pull Request           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  GitHub Actions Workflow Triggered  │
│  (update-projects.yml)              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Python Script Runs                 │
│  (fetch_repositories.py)            │
│  - Fetches your GitHub repos        │
│  - Extracts metadata                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Generates projects-data.js         │
│  - Contains all repo data           │
│  - Sorted by stars                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Commits & Pushes Changes           │
│  - Auto-commit to repository        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  GitHub Pages Rebuilds              │
│  - Website automatically updates    │
│  - New projects appear              │
└─────────────────────────────────────┘
```

## Features

### Automatic Updates
- **On PR Merge**: Every time you merge a PR, the projects list updates
- **No Manual Work**: No need to edit HTML or commit manually
- **Real-time**: Website reflects your latest GitHub activity

### Data Included
Each project includes:
- **Name**: Repository name
- **Description**: Repository description
- **URL**: Link to GitHub repository
- **Language**: Primary programming language
- **Stars**: GitHub stars count
- **Forks**: Number of forks
- **Topics**: GitHub topics/tags
- **Updated**: Last update date
- **Homepage**: Website link (if set)

### Filtering Options

The `projects-data.js` file includes helper functions:

```javascript
// Get all projects
getAllProjects()

// Get projects sorted by stars
getProjectsByStars()

// Get projects by language
getProjectsByLanguage("Python")

// Get projects by topic
getProjectsByTopic("ctf")
```

## Customization

### Filter Out Forks

Edit `scripts/fetch_repositories.py` and uncomment this line:

```python
# Skip forks if you want (optional)
if repo.get("fork", False):
    continue
```

### Change Sort Order

In `scripts/fetch_repositories.py`, modify the sorting:

```python
# Sort by stars (descending) and then by update date
projects_sorted = sorted(
    projects,
    key=lambda x: (-x["stars"], x["updated"]),
    reverse=True
)
```

### Limit Number of Projects

In `render-projects.js`, add a limit:

```javascript
// Show only top 10 projects
window.projectsData.slice(0, 10).forEach(project => {
    // render project
});
```

## Testing

### Test Locally

1. Run the Python script manually:
```bash
python scripts/fetch_repositories.py
```

2. Check the generated file:
```bash
cat blog/projects-data.js
```

3. Open your website and verify projects load

### Test in GitHub

1. Create a test pull request
2. Make a small change (e.g., update README)
3. Merge the PR
4. Watch the GitHub Actions workflow run
5. Check your website for updates

## Troubleshooting

### Projects Not Updating

1. **Check GitHub Actions**: Go to your repository → Actions tab
2. **Review Logs**: Click on the failed workflow to see error messages
3. **Verify Permissions**: Ensure the workflow has write access to your repository

### Python Script Errors

1. **Check Dependencies**: Ensure `requests` library is installed
2. **Verify GitHub API**: Test with `curl https://api.github.com/users/therealfredp3d/repos`
3. **Check File Permissions**: Ensure `scripts/fetch_repositories.py` is executable

### Website Not Rebuilding

1. **GitHub Pages Settings**: Check repository settings → Pages
2. **Branch Selection**: Ensure Pages is set to deploy from `main` or `master`
3. **Wait for Build**: GitHub Pages can take 1-2 minutes to rebuild

## Advanced Configuration

### Use GitHub Token for Higher Rate Limits

If you hit GitHub API rate limits, add a personal access token:

1. Create a token at https://github.com/settings/tokens
2. Add to repository secrets (Settings → Secrets → New repository secret)
3. Update workflow to use it:

```yaml
- name: Fetch repositories
  run: python scripts/fetch_repositories.py
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Schedule Regular Updates

To update projects on a schedule (e.g., daily), add to `.github/workflows/update-projects.yml`:

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Verify all files are in correct locations
4. Test the Python script locally first

## Next Steps

1. ✅ Copy the Python script to your repository
2. ✅ Copy the GitHub Actions workflow
3. ✅ Update your HTML with dynamic rendering
4. ✅ Test by merging a PR
5. ✅ Customize as needed

Your website is now set up for automatic project updates!
