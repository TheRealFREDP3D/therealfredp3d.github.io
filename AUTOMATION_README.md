# GitHub Repository Automation Setup

This document explains the automatic project listing system that has been added to your website.

## Overview

Your website now automatically updates with your latest GitHub repositories whenever you merge a pull request. This eliminates the need to manually edit HTML files to add new projects.

## What Was Added

### 1. **Python Script** (`scripts/fetch_repositories.py`)
- Fetches all public repositories from your GitHub account
- Extracts metadata: name, description, URL, language, stars, topics, etc.
- Generates `blog/projects-data.js` with all repository data
- Runs automatically via GitHub Actions

### 2. **GitHub Actions Workflow** (`.github/workflows/update-projects.yml`)
- Triggers automatically when a PR is merged to `main` or `master`
- Runs the Python script to fetch latest repositories
- Commits the generated `projects-data.js` file
- GitHub Pages automatically rebuilds your website

### 3. **Projects Data File** (`blog/projects-data.js`)
- Auto-generated file containing all your repositories
- Includes functions to filter and sort projects
- Similar structure to your existing `blog-data.js`

### 4. **JavaScript Renderer** (`js/render-projects.js`)
- Dynamically renders projects from the data file
- Adds visual enhancements (gradients, icons, metadata)
- Includes filtering and sorting capabilities

## Integration Steps

### Step 1: Update Your HTML

Replace the hardcoded projects grid in `index.html`:

**Before:**
```html
<div class="projects-grid">
    <div class="project-card">
        <!-- hardcoded project -->
    </div>
    <!-- more hardcoded projects -->
</div>
```

**After:**
```html
<div class="projects-grid" id="projects-grid">
    <!-- Projects will be loaded dynamically here -->
</div>
```

### Step 2: Add Scripts to HTML

Add these lines to your `index.html` before the closing `</body>` tag:

```html
<!-- Load projects data -->
<script src="blog/projects-data.js"></script>
<!-- Render projects dynamically -->
<script src="js/render-projects.js"></script>
```

### Step 3: (Optional) Add CSS Styling

If you need to update project card styling, add this to your CSS:

```css
.project-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: #666;
    margin-top: 0.5rem;
}

.project-stats {
    display: flex;
    gap: 1rem;
}

.project-updated {
    font-size: 0.75rem;
}

.project-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    border-radius: 0.5rem;
}

.project-language {
    color: white;
    font-weight: 600;
    font-size: 1.125rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
```

## How It Works

### Automatic Update Flow

```
1. You merge a PR to main/master
   ↓
2. GitHub Actions workflow triggers
   ↓
3. Python script fetches your repositories
   ↓
4. Generates projects-data.js
   ↓
5. Commits and pushes the file
   ↓
6. GitHub Pages rebuilds your website
   ↓
7. Your website shows updated projects
```

### Data Structure

Each project in `projects-data.js` contains:

```javascript
{
  "id": 1234567890,
  "name": "project-name",
  "description": "Project description",
  "url": "https://github.com/username/project-name",
  "language": "Python",
  "stars": 42,
  "forks": 5,
  "topics": ["topic1", "topic2"],
  "updated": "2025-12-31",
  "homepage": "https://project-website.com"
}
```

## Testing

### Test Locally

1. Run the Python script:
```bash
cd /home/ubuntu/therealfredp3d.github.io
python3 scripts/fetch_repositories.py
```

2. Check the generated file:
```bash
cat blog/projects-data.js
```

3. Open your website and verify projects load correctly

### Test in GitHub

1. Create a test pull request
2. Make any change (e.g., update README)
3. Merge the PR
4. Go to your repository → Actions tab
5. Watch the "Update Projects List" workflow run
6. Check your website after 1-2 minutes

## Customization

### Filter Out Forks

Edit `scripts/fetch_repositories.py` and uncomment:

```python
# Skip forks if you want (optional)
if repo.get("fork", False):
    continue
```

### Change Sort Order

In `scripts/fetch_repositories.py`, modify the sorting:

```python
# Current: sorts by stars (descending)
projects_sorted = sorted(
    projects,
    key=lambda x: (-x["stars"], x["updated"]),
    reverse=True
)

# Alternative: sort by update date
projects_sorted = sorted(
    projects,
    key=lambda x: x["updated"],
    reverse=True
)
```

### Limit Number of Projects

In `js/render-projects.js`, modify the rendering loop:

```javascript
// Show only top 10 projects
window.projectsData.slice(0, 10).forEach((project, index) => {
    // render project
});
```

### Use Custom Images

Instead of gradients, use custom images:

```javascript
// In render-projects.js
const projectImages = {
    'project-name': 'assets/images/project-image.jpg',
    // ...
};

// Then in the rendering:
const imageUrl = projectImages[project.name] || null;
if (imageUrl) {
    // Use custom image
} else {
    // Use gradient fallback
}
```

## Troubleshooting

### Projects Not Updating

**Check GitHub Actions:**
1. Go to your repository
2. Click "Actions" tab
3. Look for "Update Projects List" workflow
4. Click on failed run to see error logs

**Common Issues:**
- Workflow not triggered: Ensure PR was merged to `main` or `master`
- Python script failed: Check if `requests` library is available
- File not committed: Verify workflow has write permissions

### Website Still Shows Old Projects

1. **Hard refresh your browser:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear browser cache:** Check browser settings
3. **Wait for GitHub Pages:** Can take 1-2 minutes to rebuild
4. **Check file was committed:** Verify `blog/projects-data.js` was updated

### GitHub Actions Permissions Error

If you see permission errors:

1. Go to repository Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Save and re-run the workflow

## Advanced Features

### Helper Functions in projects-data.js

The generated file includes utility functions:

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

### Use These Functions

```javascript
// Example: Show only Python projects
const pythonProjects = getProjectsByLanguage("Python");

// Example: Show top 5 projects by stars
const topProjects = getProjectsByStars().slice(0, 5);

// Example: Show CTF-related projects
const ctfProjects = getProjectsByTopic("ctf");
```

## File Locations

```
your-repository/
├── scripts/
│   └── fetch_repositories.py      ← Python script
├── .github/
│   └── workflows/
│       └── update-projects.yml    ← GitHub Actions workflow
├── blog/
│   ├── blog-data.js               ← Existing
│   └── projects-data.js           ← Auto-generated
├── js/
│   ├── main.js                    ← Existing
│   └── render-projects.js         ← New renderer
└── index.html                     ← Updated
```

## Next Steps

1. ✅ Update `index.html` with the new projects grid ID
2. ✅ Add the script tags to load data and renderer
3. ✅ Test by merging a PR
4. ✅ Customize styling if needed
5. ✅ Monitor GitHub Actions for any issues

## Support

For issues:
1. Check GitHub Actions logs
2. Run Python script locally to test
3. Verify all files are in correct locations
4. Check browser console for JavaScript errors

Your website is now set up for automatic project updates! 🎉
