---
layout: collection
title: "Software & Tools"
collection: tools
permalink: /tools/
entries_layout: grid
---

This section explores various software tools, development environments, and utilities that I use or have evaluated. Each entry provides an overview, installation guide, and practical usage examples.

## Featured Tools

{% assign featured_tools = site.tools | where: "featured", true | limit: 2 %}
{% for tool in featured_tools %}

- [{{ tool.title }}]({{ tool.url }}) - {{ tool.description | truncate: 100 }}
{% endfor %}
