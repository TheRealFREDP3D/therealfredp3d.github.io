# Quick Start: Dynamic Projects Integration

This is a quick reference guide to integrate the automatic project listing into your existing website.

## 📋 What You Need to Do

### 1. Update `index.html`

Find the projects section and replace it with:

```html
<!-- Projects Section -->
<section id="projects" class="projects">
    <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid" id="projects-grid">
            <!-- Projects will be loaded dynamically here -->
        </div>
    </div>
</section>
```

### 2. Add Scripts Before `</body>` Tag

Add these two lines at the end of your `index.html`:

```html
    <!-- Load projects data -->
    <script src="blog/projects-data.js"></script>
    <!-- Render projects dynamically -->
    <script src="js/render-projects.js"></script>
</body>
```

### 3. (Optional) Update CSS

Add this to your CSS file if needed:

```css
.project-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #666;
    margin-top: 0.5rem;
}

.project-stats {
    display: flex;
    gap: 1rem;
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

## 🚀 How It Works

1. **You merge a PR** → GitHub Actions automatically runs
2. **Python script fetches** your latest repositories from GitHub
3. **Generates `blog/projects-data.js`** with all your projects
4. **Commits the file** back to your repository
5. **GitHub Pages rebuilds** your website
6. **Projects display dynamically** on your site

## ✅ Testing

### Test Locally (Optional)
```bash
cd /home/ubuntu/therealfredp3d.github.io
python3 scripts/fetch_repositories.py
```

### Test in GitHub
1. Create a test PR
2. Merge it to `main` or `master`
3. Go to Actions tab to see the workflow run
4. Wait 1-2 minutes for GitHub Pages to rebuild
5. Check your website for updated projects

## 📁 Files Added/Modified

**New Files:**
- `scripts/fetch_repositories.py` - Python script to fetch repos
- `.github/workflows/update-projects.yml` - GitHub Actions workflow
- `blog/projects-data.js` - Auto-generated projects data
- `js/render-projects.js` - JavaScript renderer for projects

**Modified Files:**
- `index.html` - Update projects section (see Step 1 above)

## 🔧 Customization

### Show Only Top 10 Projects
Edit `js/render-projects.js`:
```javascript
window.projectsData.slice(0, 10).forEach((project, index) => {
```

### Filter Out Forks
Edit `scripts/fetch_repositories.py` and uncomment:
```python
if repo.get("fork", False):
    continue
```

### Sort by Update Date Instead of Stars
Edit `scripts/fetch_repositories.py`:
```python
projects_sorted = sorted(projects, key=lambda x: x["updated"], reverse=True)
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Projects not showing | Hard refresh browser (Ctrl+Shift+R) |
| Workflow not running | Ensure PR was merged to `main` or `master` |
| Old projects still showing | Wait 2 minutes for GitHub Pages rebuild |
| Permission error | Check repo Settings → Actions → Permissions |

## 📚 More Information

- **Full Setup Guide**: See `AUTOMATION_README.md`
- **Implementation Details**: See `DYNAMIC_PROJECTS_SETUP.md`
- **Architecture Overview**: See `IMPLEMENTATION_PLAN.md`

## 🎯 Next Steps

1. ✅ Update `index.html` with new projects grid
2. ✅ Add script tags to load data and renderer
3. ✅ Push changes to your repository
4. ✅ Create and merge a test PR
5. ✅ Verify projects update automatically

That's it! Your website now has automatic project updates! 🎉

---

**Questions?** Check the troubleshooting section above or review the full documentation files.
