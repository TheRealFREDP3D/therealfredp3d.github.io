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

## Content Management Strategy

### Writing Flow
The writing experience is offered by Obsidian so that all setups are smooth and create content faster. Features like a file explorer, search, and document outlining aid in the organization and rapid location of information, while a powerful markdown editor facilitates intuitive formatting. It makes sure content is all related through internal linking to help with navigation within your site.

### Metadata Management (through Frontmatter)
Frontmatter creates a consistent structure and storage for the metadata of all the posts. The structure of this JSON-based system includes required fields including title, description, date, tags, and categories. They handle content filtering, sorting, and automation across the website much more efficiently.

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
Knowledge is organized and tagged in a structured format, allowing content to be searched and organized easily. Taxonomy data is stored in `.frontmatter/database/taxonomyDb.json` to allow you to browse it structured. Posts get organized in terms of categories, tags, and years, which means users have an organized, logical, and intuitive navigation structure to visit.

- **Categories** (`/categories/`): Bundle related content
- **Tags** (`/tags/`): Enhance search capabilities
- **Years** (`/posts/`): Chronological organization of posts

## Development and Deployment Strategy

### Overall Workflow
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

### Content Creation Process
The content creation and publishing workflow ensures quality and consistency through a defined process:

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

### Version Control Strategy
Our Git branching strategy maintains clean code and enables collaborative development:

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

## Technical Architecture

### Component Structure
The site architecture is organized into three main layers that work together seamlessly:

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

### Monitoring and Analytics
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
