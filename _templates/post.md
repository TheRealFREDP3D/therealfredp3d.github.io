---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +/-TTTT
description: "Brief description for SEO and previews"
preview: /assets/images/posts/YYYY-MM-DD-preview.png
categories: [primary-category, secondary-category]
tags: [tag1, tag2, tag3]
mermaid: true  # Enable Mermaid diagrams
toc: true      # Enable table of contents
toc_sticky: true  # Make TOC sticky while scrolling
---

{% if page.toc %}
## Table of Contents
{: .no_toc }
* TOC
{:toc}
{% endif %}

## Introduction
Brief overview of the post topic and what readers will learn.

## Main Content Section

### Subsection with Mermaid Diagram
{% if page.mermaid %}
```mermaid
graph TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[Result 1]
    C -->|No| E[Result 2]
```
{% endif %}

### Subsection with Code Example
```ruby
def example_method
  puts "This is a code block"
end
```

### Subsection with Notice
{% capture notice-text %}
**Important Note:**
This is a notice block for important information.
{% endcapture %}

<div class="notice--info">
  {{ notice-text | markdownify }}
</div>

## Advanced Features

### Image with Caption
{% include figure image_path="/assets/images/sample-image.jpg" 
   alt="Descriptive alt text" 
   caption="This is the image caption." %}

### Collapsible Content
<details>
<summary>Click to expand</summary>

This content is hidden by default but can be expanded.

</details>

### Complex Mermaid Diagram
{% if page.mermaid %}
```mermaid
sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request Data
    System->>Database: Query
    Database-->>System: Response
    System-->>User: Display Results
```
{% endif %}

## References and Further Reading
- [Reference Link 1][1]
- [Reference Link 2][2]

## Related Posts
{% assign related_posts = site.posts | where_exp:"post", "post.tags contains page.tags.first" | where_exp:"post", "post.url != page.url" | limit:3 %}
{% if related_posts.size > 0 %}
<ul>
  {% for post in related_posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
{% endif %}

---
[1]: https://example.com/reference1
[2]: https://example.com/reference2

