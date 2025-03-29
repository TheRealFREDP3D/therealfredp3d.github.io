---
created: Friday, March 28th 2025, 11:09:48 pm
title: Building and Managing a Website Bipolar Strategy
description: Discover my plan for building and managing this page effectively using both Obsidian and VSCode.
date: 2025-03-29T03:19:35.454Z
preview: /images/obsidian-vscode-duo.png
tags:
  - coding
  - content-management
  - content-workflow
  - github-pages
  - github
  - ideas
  - linking
  - markdown
  - notes
  - programming
  - reference
  - static-site-generation
  - text
  - type/writeup
  - website-creation
  - website-deployment
  - website-management
  - website-workflow
  - writing
categories:
  - Tool
  - Workflow
  - Coding
  - Content
keywords:
  - managing
  - page
  - workflow
  - writing
---

## Content Management Workflow

### Writing Flow

Obsidian provides the writing environment, making content creation seamless and efficient. Its powerful markdown editor allows for intuitive formatting, while features like file explorer, search, and document outlining help organize and locate information quickly. Internal linking enhances content connectivity, making navigation effortless.

### Metadata Management (via Frontmatter)

Metadata is structured and stored using Frontmatter, ensuring consistency across all posts. This JSON-based system defines essential fields such as title, description, date, tags, and categories. Proper metadata management helps streamline content filtering, categorization, and automation within the website.

```json
{
  "frontMatter.taxonomy.contentTypes": [
    {
      "name": "post",
      "fields": [
        {
          "title": "Title",
          "name": "title",
          "type": "string",
          "required": true
        },
        {
          "title": "Description",
          "name": "description",
          "type": "string",
          "required": true
        },
        {
          "title": "Publishing date",
          "name": "date",
          "type": "datetime",
          "required": true
        },
        {
          "title": "Tags",
          "name": "tags",
          "type": "tags"
        },
        {
          "title": "Categories",
          "name": "categories",
          "type": "categories"
        }
      ]
    }
  ]
}
```

### Content Organization

Content is categorized and tagged systematically to facilitate easy retrieval and organization. Taxonomy data is stored in `.frontmatter/database/taxonomyDb.json`, allowing structured browsing. Posts are arranged by categories, tags, and years, ensuring a logical and intuitive navigation structure for users.

- **Categories** (`/categories/`): Group similar content together
- **Tags** (`/tags/`): Provide specific identifiers for refined search
- **Years** (`/posts/`): Organize posts chronologically

## Development Workflow

A local preview of the website can be accessed at `http://localhost:4000`, enabling real-time content validation. Git integration ensures version control, allowing for efficient tracking of changes. Jekyll serves as the static site generator, seamlessly compiling markdown files into a functional website hosted via GitHub Pages.

### Workflow Overview

The development process follows a structured path from content creation to deployment:

```mermaid
graph LR
    A[Content Creation<br/>Obsidian] --> B[Technical Setup<br/>VSCode]
    B --> C[Local Testing<br/>Jekyll]
    C --> D[Version Control<br/>Git]
    D --> E[Deployment<br/>GitHub Pages]
    E --> F[Monitoring<br/>Analytics]
    
    style A fill:#2196F3,color:#fff
    style B fill:#FF9800,color:#fff
    style C fill:#9C27B0,color:#fff
    style D fill:#4CAF50,color:#fff
    style E fill:#E91E63,color:#fff
    style F fill:#673AB7,color:#fff
```

### Content Flow Process

The content creation and publishing workflow ensures quality and consistency:

1. Write content in Obsidian
2. Review and refine
3. Add necessary metadata
4. Preview locally
5. Deploy when ready

```mermaid
flowchart TD
    A[Write in Obsidian] --> B{Content Ready?}
    B -->|No| A
    B -->|Yes| C[Add Frontmatter]
    C --> D[Preview in Jekyll]
    D --> E{Looks Good?}
    E -->|No| C
    E -->|Yes| F[Commit Changes]
    F --> G[Push to GitHub]
    G --> H[Automatic Deployment]
    
    style A fill:#2196F3,color:#fff
    style B fill:#FF5722,color:#fff
    style C fill:#4CAF50,color:#fff
    style D fill:#E91E63,color:#fff
    style E fill:#FF5722,color:#fff
    style F fill:#673AB7,color:#fff
    style G fill:#009688,color:#fff
    style H fill:#E91E63,color:#fff
```

### Git Branching Strategy

Our version control strategy maintains clean code and enables collaborative development:

```mermaid
gitGraph
    commit
    branch feature/new-post
    checkout feature/new-post
    commit
    commit
    checkout main
    merge feature/new-post
    branch feature/site-update
    checkout feature/site-update
    commit
    commit
    checkout main
    merge feature/site-update
```

### Deployment Pipeline

The automated deployment process ensures reliable and consistent site updates:

```mermaid
sequenceDiagram
    participant L as Local Environment
    participant G as Git Repository
    participant A as GitHub Actions
    participant P as GitHub Pages
    participant C as CDN
    
    L->>G: Push Changes
    G->>A: Trigger Workflow
    A->>A: Build Jekyll Site
    A->>A: Run Tests
    A->>P: Deploy if Success
    P->>C: Cache Assets
    C->>User: Serve Content
```

### Component Architecture

The site architecture is organized into three main layers:

1. Content Layer: Manages all content and assets
2. Build Layer: Processes and generates the site
3. Delivery Layer: Serves content to users

```mermaid
graph TB
    subgraph Content Layer
        A[Markdown Files]
        B[Assets]
        C[Configuration]
    end
    
    subgraph Build Layer
        D[Jekyll]
        E[Plugins]
        F[Templates]
    end
    
    subgraph Delivery Layer
        G[GitHub Pages]
        H[CDN]
        I[Browser]
    end
    
    A --> D
    B --> D
    C --> D
    D --> G
    E --> D
    F --> D
    G --> H
    H --> I
    
    style A fill:#2196F3,color:#fff
    style B fill:#4CAF50,color:#fff
    style C fill:#FF9800,color:#fff
    style D fill:#9C27B0,color:#fff
    style E fill:#E91E63,color:#fff
    style F fill:#673AB7,color:#fff
    style G fill:#2196F3,color:#fff
    style H fill:#4CAF50,color:#fff
    style I fill:#FF9800,color:#fff
```

### Monitoring and Analytics Flow

Continuous monitoring helps optimize site performance and user experience:

```mermaid
graph LR
    A[User Visit] --> B[Page Load]
    B --> C[Analytics Tracking]
    C --> D[Data Collection]
    D --> E[Analysis]
    E --> F[Reports]
    F --> G[Optimization]
    G --> B
    
    style A fill:#2196F3,color:#fff
    style B fill:#FF9800,color:#fff
    style C fill:#9C27B0,color:#fff
    style D fill:#4CAF50,color:#fff
    style E fill:#E91E63,color:#fff
    style F fill:#673AB7,color:#fff
    style G fill:#2196F3,color:#fff
```

These diagrams provide visual representations of:
1. Overall workflow overview
2. Content creation and publishing flow
3. Git branching strategy
4. Deployment pipeline sequence
5. Component architecture
6. Monitoring and analytics cycle

Each diagram uses vibrant colors with white text for maximum readability, while maintaining a professional appearance. The color schemes help distinguish different components and stages of the process while ensuring text remains clearly visible.

### Recommended Process

1. **Create content** using Obsidian, leveraging its markdown editor and organization tools
   - Write content in a distraction-free environment with live preview
   - Utilize Obsidian's linking capabilities for connected thought
   - Take advantage of templates and plugins for consistent content structure

2. **Manage metadata** with Frontmatter to structure content effectively and maintain consistency
   - Use the Frontmatter VSCode extension to manage post metadata
   - Ensure all required fields (title, description, date) are properly filled
   - Apply consistent tagging and categorization for better content organization

3. **Preview locally** with Jekyll to ensure the site builds correctly before deployment
   - Run `bundle exec jekyll serve` to start local development server
   - Check content rendering, layout, and responsive design
   - Verify all links, images, and embedded content work as expected

4. **Commit changes** using Git for version control, enabling rollback and collaboration
   - Stage and commit changes with meaningful commit messages
   - Review changes using Git diff before committing
   - Maintain a clean Git history for easier collaboration

5. **Automatic deployment** via GitHub Pages ensures the site updates seamlessly after commits
   - Push changes to the main branch to trigger automatic deployment
   - Monitor GitHub Actions for successful build and deployment
   - Verify changes are live on the production site

### Content Structure

The website's structure is logically organized into directories, ensuring clean and efficient content management:

- **Posts**: Stored in `_posts` directory, managed by Frontmatter for structured metadata
- **Pages**: Stored in `_pages` directory to separate standalone content from posts
- **Assets**: Stored in `assets` directory for media, images, and other resources
- **Navigation**: Defined in `_data/navigation.yml`, structuring menu links and internal navigation

This workflow integrates Obsidian's editing capabilities, Frontmatter's metadata management, and Jekyll's static site generation, creating a seamless and efficient content publishing system.



