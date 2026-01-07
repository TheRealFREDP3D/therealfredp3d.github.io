#!/usr/bin/env python3
"""
Fetch GitHub repositories and generate projects-data.js
This script is run by GitHub Actions on every PR merge to keep the projects list updated.
"""

import requests
import json
import os
from datetime import datetime
from pathlib import Path

# Configuration
GITHUB_USERNAME = "therealfredp3d"
GITHUB_API_URL = "https://api.github.com"
OUTPUT_FILE = "blog/projects-data.js"

# Language to icon/color mapping
LANGUAGE_COLORS = {
    "Python": "#3776ab",
    "JavaScript": "#f1e05a",
    "TypeScript": "#2b7489",
    "Java": "#b07219",
    "C++": "#f34b7d",
    "C": "#555555",
    "Go": "#00add8",
    "Rust": "#ce422b",
    "Ruby": "#cc342d",
    "PHP": "#777bb4",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Shell": "#89e051",
    "Dockerfile": "#384d54",
    "Markdown": "#083fa1",
}

def fetch_repositories():
    """Fetch all public repositories for the user."""
    try:
        url = f"{GITHUB_API_URL}/users/{GITHUB_USERNAME}/repos"
        params = {
            "type": "owner",
            "sort": "updated",
            "direction": "desc",
            "per_page": 100
        }
        
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        
        repos = response.json()
        print(f"✓ Fetched {len(repos)} repositories from GitHub")
        return repos
    except requests.exceptions.RequestException as e:
        print(f"✗ Error fetching repositories: {e}")
        return []

def format_date(date_string):
    """Format ISO date to readable format."""
    try:
        date_obj = datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        return date_obj.strftime("%Y-%m-%d")
    except:
        return date_string

def validate_string(value, max_length=500):
    """Validate and sanitize string input."""
    if not isinstance(value, str):
        return ""
    # Strip whitespace and limit length
    return value.strip()[:max_length]

def validate_url(url):
    """Validate URL format."""
    if not isinstance(url, str):
        return None
    url = url.strip()
    # Only allow http and https URLs
    if url.startswith(('http://', 'https://')):
        return url
    return None

def validate_list(items):
    """Validate and sanitize list of strings."""
    if not isinstance(items, list):
        return []
    return [validate_string(item, 100) for item in items if isinstance(item, str)]

def process_repositories(repos):
    """Process repositories and extract relevant data."""
    projects = []
    
    if not isinstance(repos, list):
        print("✗ Invalid repos data type")
        return projects
    
    for repo in repos:
        # Validate repo is a dict
        if not isinstance(repo, dict):
            continue
        
        # Skip forks if you want (optional)
        if repo.get("fork", False):
            continue
        
        # Validate required fields
        try:
            repo_id = repo.get("id")
            repo_name = validate_string(repo.get("name", "Untitled"), 100)
            repo_description = validate_string(repo.get("description") or "No description provided", 500)
            repo_url = validate_url(repo.get("html_url"))
            repo_language = validate_string(repo.get("language") or "Other", 50)
            repo_stars = int(repo.get("stargazers_count", 0))
            repo_forks = int(repo.get("forks_count", 0))
            repo_topics = validate_list(repo.get("topics", []))
            repo_updated = format_date(repo.get("updated_at", ""))
            repo_homepage = validate_url(repo.get("homepage"))
            
            # Skip if critical fields are missing
            if not repo_id or not repo_name or not repo_url:
                continue
            
            # Ensure numeric fields are non-negative
            repo_stars = max(0, repo_stars)
            repo_forks = max(0, repo_forks)
            
            project = {
                "id": repo_id,
                "name": repo_name,
                "description": repo_description,
                "url": repo_url,
                "language": repo_language,
                "stars": repo_stars,
                "forks": repo_forks,
                "topics": repo_topics,
                "updated": repo_updated,
                "homepage": repo_homepage,
            }
            projects.append(project)
        except (ValueError, TypeError, AttributeError) as e:
            print(f"⚠ Skipping invalid repository: {e}")
            continue
    
    print(f"✓ Processed {len(projects)} repositories")
    return projects

def generate_javascript_file(projects):
    """Generate the projects-data.js file."""
    if not isinstance(projects, list):
        print("✗ Invalid projects data type")
        return ""
    
    # Sort by stars (descending) and then by update date
    try:
        projects_sorted = sorted(
            projects,
            key=lambda x: (-x.get("stars", 0), x.get("updated", "")),
        )
    except (TypeError, KeyError) as e:
        print(f"⚠ Error sorting projects: {e}")
        projects_sorted = projects
    
    # Create JavaScript content
    js_content = """// Auto-generated file - Do not edit manually
// This file is generated by scripts/fetch_repositories.py
// Last updated: {timestamp}

const projectsData = {projects_json};

// Function to get all projects
function getAllProjects() {{
    return projectsData;
}}

// Function to get projects sorted by stars
function getProjectsByStars() {{
    return projectsData.sort((a, b) => b.stars - a.stars);
}}

// Function to get projects by language
function getProjectsByLanguage(language) {{
    return projectsData.filter(project => 
        project.language.toLowerCase() === language.toLowerCase()
    );
}}

// Function to get projects by topic
function getProjectsByTopic(topic) {{
    return projectsData.filter(project =>
        project.topics.some(t => 
            t.toLowerCase().includes(topic.toLowerCase())
        )
    );
}}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{ projectsData, getAllProjects, getProjectsByStars, getProjectsByLanguage, getProjectsByTopic }};
}}
""".format(
        timestamp=datetime.now().isoformat(),
        projects_json=json.dumps(projects_sorted, indent=2)
    )
    
    return js_content

def write_output_file(content):
    """Write the JavaScript file to disk."""
    try:
        # Ensure directory exists
        Path(OUTPUT_FILE).parent.mkdir(parents=True, exist_ok=True)
        
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Generated {OUTPUT_FILE}")
        return True
    except Exception as e:
        print(f"✗ Error writing output file: {e}")
        return False

def main():
    """Main execution function."""
    print("🔄 Fetching GitHub repositories...")
    
    repos = fetch_repositories()
    if not repos:
        print("✗ No repositories found or error occurred")
        return False
    
    projects = process_repositories(repos)
    if not projects:
        print("✗ No projects to process")
        return False
    
    js_content = generate_javascript_file(projects)
    
    if write_output_file(js_content):
        print("✅ Successfully generated projects-data.js")
        return True
    else:
        print("❌ Failed to generate projects-data.js")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
