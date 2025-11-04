---
layout: page
icon: fas fa-globe
order: 3
panel_includes:
  - toc
tail_includes: null
---

<!-- Motto, Projects, Journey, Gallery, Hobby, Meeting -->
## Motto

> <b>Life is not a problem to be solved, but a reality to be experienced.</b>

> <b>KISS: Keep it simple and straightforward.</b>

> <b>STAR: Situation, Task, Action, Result.</b>

<hr>
## 🤗 Let's Connect!

<div class="schedule-time">
{% assign _email = site.social.email | split: '@' %}
{%- capture _url -%}
  javascript:location.href = 'mailto:' + ['{{ _email[0] }}','{{ _email[1] }}'].join('@')
{%- endcapture -%}
{%- capture _contact -%}
  <a href="{{ _url }}" link-attr-ignore><i class="fas fa-envelope"></i></a>
{%- endcapture -%}

I'm always glad to discuss ideas or just chat! Feel free to email me {{ _contact }} or schedule a meeting <a href="https://calendar.notion.so/meet/jcli-7s60p1fdd/95tj3p70"><i class="fas fa-calendar" aria-hidden="true"></i></a>.
</div>

<hr>
## ⭐️ Projects

<div class="row justify-content-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include modules/repo.html repository=repo %}
  {% endfor %}
</div>

<hr>
## 🌏 Journey Across the World

{% include modules/world_map.html %}

<p>
My journey 🗺:<br>
{% for country in site.data.visited.countries %}
  {{ country.flag }}{{ country.name }}{% unless forloop.last %}, {% endunless %}
{% endfor %}
</p>
