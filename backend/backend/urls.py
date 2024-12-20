"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

# Create a router and register our viewsets with it
router = routers.DefaultRouter()
router.register(r'jobs', views.JobViewSet, basename='job')
router.register(r'applications', views.ApplicationViewSet, basename='application')

# The API URLs are determined automatically by the router
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Mount the router URLs under /api/
    path('api/stats/', views.dashboard_stats, name='dashboard-stats'),
]
