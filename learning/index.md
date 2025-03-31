---
layout: collection
title: "Learning Journey"
collection: learning
permalink: /learning/
entries_layout: grid
---

This is where I document my learning progress, insights, and reflections as I grow professionally and personally. Each post covers specific topics I'm exploring, challenges I've overcome, and resources that have helped me along the way.

## Recent Learning Entries

{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
