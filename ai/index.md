---
layout: collection
title: "Artificial Intelligence"
collection: ai
permalink: /ai/
entries_layout: grid
---

This section explores various aspects of AI, including machine learning techniques, models, applications, and ethical considerations. I document experiments, share insights, and discuss the latest developments in the field.

## Featured AI Topics

{% assign featured_ai_topics = site.ai | where: "featured", true | limit: 2 %}
{% for topic in featured_ai_topics %}

- [{{ topic.title }}]({{ topic.url }}) - {{ topic.description | truncate: 100 }}
{% endfor %}
