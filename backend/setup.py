from setuptools import setup, find_packages

setup(
    name="backend",
    packages=find_packages(),
    install_requires=[
        'django>=4.2.0,<4.3.0',
        'djangorestframework>=3.14.0,<3.15.0',
        'psycopg2-binary>=2.9.9,<3.0.0',
        'django-cors-headers>=4.3.1,<4.4.0',
    ],
) 