#!/usr/bin/env python
from setuptools import setup


with open('README.md') as f:
    long_description = f.read()

setup(
    name='django-nucleus',
    description='Theme for Django admin',
    short_description='Theme for Django admin',
    long_description=long_description,
    long_description_content_type='text/markdown',
    version='0.1.1',
    url='http://github.com/lukasvinclav/django-nucleus',
    packages=[
        'nucleus',
    ],
    include_package_data=True,
    install_requires=('django', ),
    classifiers=[
        'Programming Language :: Python',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Operating System :: OS Independent',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Framework :: Django',
    ],
    keywords="django admin theme clean minimal ui sidebar"
)