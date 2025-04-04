---
layout: default
title: Home
---

{% include navigation.html %}

# Welcome to Fred's Learning Journey

## Latest Updates

### Recent Posts
{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}

### Featured Projects
{% assign featured_projects = site.projects | where: "featured", true | limit: 2 %}
{% for project in featured_projects %}
- [{{ project.title }}]({{ project.url }}) - {{ project.description | truncate: 100 }}
{% endfor %}

## Quick Links

### Learning Paths
- [🔒 Cybersecurity Track](/learning/cybersecurity)
- [💻 Coding Track](/learning/coding)
- [🤖 AI Track](/learning/ai)

### Resources
- [📚 Learning Materials](/learning/)
- [🛠️ Tools Collection](/tools/)
- [📂 All Projects](/projects/)

## Skills Progress
- Python Development
- Machine Learning
- Network Security
- Web Development

[View Full Journey](/learning)



