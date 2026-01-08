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
    """Format ISO date to readable format with error handling."""
    try:
        if not isinstance(date_string, str) or not date_string:
            return "Unknown"
        
        date_obj = datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        return date_obj.strftime("%Y-%m-%d")
    except (ValueError, TypeError, AttributeError) as e:
        print(f"⚠ Error formatting date '{date_string}': {e}")
        return "Unknown"

def validate_string(value, max_length=500):
    """Validate and sanitize string input with error handling."""
    try:
        if value is None:
            return ""
        
        if not isinstance(value, str):
            # Try to convert to string if possible
            value = str(value)
            if value in ('[object Object]', '[object Array]'):
                return ""
        
        trimmed = value.strip()
        if not trimmed:
            return ""
        
        return trimmed[:max_length]
    except (TypeError, AttributeError) as e:
        print(f"⚠ Error validating string: {e}")
        return ""

def validate_url(url):
    """Validate URL format with error handling."""
    try:
        if url is None:
            return None
        
        if not isinstance(url, str):
            return None
        
        url = url.strip()
        if not url:
            return None
        
        # Only allow http and https URLs
        if url.startswith(('http://', 'https://')):
            return url
        
        return None
    except (TypeError, AttributeError) as e:
        print(f"⚠ Error validating URL: {e}")
        return None

def validate_list(items):
    """Validate and sanitize list of strings with error handling."""
    try:
        if items is None:
            return []
        
        if not isinstance(items, list):
            print(f"⚠ Expected list but got {type(items).__name__}")
            return []
        
        if not items:
            return []
        
        validated = []
        for item in items:
            if isinstance(item, str):
                validated_item = validate_string(item, 100)
                if validated_item:
                    validated.append(validated_item)
            else:
                print(f"⚠ Skipping non-string item in list: {type(item).__name__}")
        
        return validated
    except (TypeError, AttributeError) as e:
        print(f"⚠ Error validating list: {e}")
        return []

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
            
            # Safely convert numeric fields
            try:
                repo_stars = int(repo.get("stargazers_count", 0))
            except (ValueError, TypeError):
                print(f"⚠ Invalid stars count for repo {repo_name}: {repo.get('stargazers_count')}")
                repo_stars = 0
            
            try:
                repo_forks = int(repo.get("forks_count", 0))
            except (ValueError, TypeError):
                print(f"⚠ Invalid forks count for repo {repo_name}: {repo.get('forks_count')}")
                repo_forks = 0
            
            repo_topics = validate_list(repo.get("topics", []))
            repo_updated = format_date(repo.get("updated_at", ""))
            repo_homepage = validate_url(repo.get("homepage"))
            
            # Skip if critical fields are missing or invalid
            if not repo_id:
                print(f"⚠ Skipping repository with missing ID")
                continue
            
            if not repo_name or not repo_name.strip():
                print(f"⚠ Skipping repository with empty name")
                continue
            
            if not repo_url:
                print(f"⚠ Skipping repository '{repo_name}' with invalid URL")
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
        except (ValueError, TypeError, AttributeError, KeyError) as e:
            print(f"⚠ Error processing repository: {e}")
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
        if not projects:
            print("⚠ No projects to sort")
            return ""
        
        projects_sorted = sorted(
            projects,
            key=lambda x: (-x.get("stars", 0), x.get("updated", "")),
        )
    except (TypeError, KeyError, AttributeError) as e:
        print(f"⚠ Error sorting projects: {e}")
        projects_sorted = projects
    
    # Create JavaScript content
    try:
        projects_json = json.dumps(projects_sorted, indent=2)
    except (TypeError, ValueError) as e:
        print(f"✗ Error serializing projects to JSON: {e}")
        return ""
    
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
        projects_json=projects_json
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
    """Main execution function with comprehensive error handling."""
    try:
        print("🔄 Fetching GitHub repositories...")
        
        repos = fetch_repositories()
        if not repos:
            print("✗ No repositories found or error occurred")
            return False
        
        print(f"📦 Processing {len(repos)} repositories...")
        projects = process_repositories(repos)
        if not projects:
            print("✗ No valid projects to process")
            return False
        
        print(f"✓ Successfully validated {len(projects)} projects")
        
        js_content = generate_javascript_file(projects)
        if not js_content:
            print("✗ Failed to generate JavaScript content")
            return False
        
        if write_output_file(js_content):
            print(f"✅ Successfully generated projects-data.js ({len(projects)} projects)")
            return True
        else:
            print("❌ Failed to generate projects-data.js")
            return False
    except Exception as e:
        print(f"❌ Unexpected error in main: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    try:
        success = main()
        exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⚠ Script interrupted by user")
        exit(130)
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        exit(1)
