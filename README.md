# django-nucleus

![](https://img.shields.io/badge/Version-0.1.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Django-2.1+-green.svg?style=flat-square)
![](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

Django Nucleus is Django admin theme extending default admin CSS styles.

## Getting started

1. Installation

```bash
pip install django-nucleus
```

or if you are using pipenv

```bash
pipenv install django-nucleus
```

2. Add **nucleus** into **INSTALLED_APPS** in your settings file before **django.contrib.admin**.

3. Update **context_processors** by adding new context processor **nucleus.context_processors.nucleus**

## Nucleus settings

```python
_ = lambda s: s  # Translations in setting file

NUCLEUS = {
    'sidebar': {
        # Title
        'title': 'Custom title',

        # Navigation
        'navigation': {
            # Application
            'auth': {
                'title': _('Accounts'), # Override title
                'icon': 'img/custom-icon.svg' # Optional
            },

            # Model
            'auth.User': {
                'title': _('Users'),
                'icon': 'img/custom-icon.svg'
            }        
        }    
    }
}
```

## Custom dashboard page

**apps.py**

```python
from django.contrib.admin.apps import AdminConfig


class AppAdminConfig(AdminConfig):
    default_site = 'app.admin.AppAdmin'
```

**admin.py**

```python
from django.contrib.admin import AdminSite


class AppAdmin(AdminSite):
    def index(self, request, extra_context=None):
        # Update extra_context with new variables
        return super().index(request, extra_context)
```

**settings.py**

```python
INSTALLED_APPS = [
    'app.apps.AppAdminConfig',
    # 'django.contrib.admin',    
]
```

**templates/admin/index.html**

```djangotemplate
{% extends "admin/base_site.html" %}
{% load i18n static %}

{% block bodyclass %}{{ block.super }} dashboard{% endblock %}

{% block breadcrumbs %}{% endblock %}

{% block content %}
 
{% endblock %}
```

## Components

### Heading

```python
return render_to_string('nucleus/components/heading.html', {
    'icon': 'img/image.png', # Optional image
    'title': 'Title,
    'subtitle': 'Subtitle,
})
```

### Stat item

```python
return render_to_string('nucleus/components/stat_item.html', {
    value: '5269',
    title: 'Units Sold',
    subtitle: 'Avg. 351 per week', 
    label: '-12%',
})
```

### Chart

```python
return render_to_string('nucleus/components/chart.html', {
    series: '{"labels": ["1", "2", "3"], "datasets": [{"data": [1, 2, 3]}]}', # JSON object
    height: 360,  # Optional 
})
```

### Signed number

```python
return render_to_string('nucleus/components/signed_number.html', {
    'value': 21.87,  # Value which will be compared
    'display': '$21.87 ',  # For example string with currency to display (django-money object)
})
```

### Progress

```python
return render_to_string('nucleus/components/progress.html', {
    'value': 32,  # Value in percent in this case it will be (style="width: 32%")
})
```

## Credits

- [Feather](https://feathericons.com/)
- [django-capture-tag](https://github.com/edoburu/django-capture-tag)
- [Tailwind CSS](https://tailwindcss.com)
- [Nunito](https://fonts.google.com/specimen/Nunito)
- [Chart.js](https://www.chartjs.org/)