---
layout: default
title: Home
description: "Welcome to Fred's Learnings and Projects – exploring Cybersecurity, Coding, AI, Projects, and Tools."
---

# Welcome to Fred's Learnings and Projects

Welcome to my personal webpage where I share insights, projects, and learning experiences in cybersecurity, coding, AI, and more.

## Latest Updates

{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}

## Featured Projects

{% assign featured_projects = site.projects | where: "featured", true | limit: 2 %}
{% for project in featured_projects %}
- [{{ project.title }}]({{ project.url }}) - {{ project.description | truncate: 100 }}
{% endfor %}

## Quick Links

- [Learning Resources](/learning/)
- [Projects](/projects/)
- [Tools](/tools/)
- [About](/about/)

## Skills Progress

- Python Development
- Machine Learning
- Network Security
- Web Development

[Explore More](/learning)