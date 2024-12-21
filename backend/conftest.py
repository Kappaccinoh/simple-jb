import os
import sys
import django
from django.conf import settings
import pytest
from django.contrib.auth.models import User
from backend.models import Company, Job

# Add the project root directory to Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__))))

# Configure Django settings before running tests
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

@pytest.fixture
def company():
    return Company.objects.create(
        name="Test Company",
        description="Test Description",
        website="https://test.com",
        location="Test Location"
    )

@pytest.fixture
def job(company):
    return Job.objects.create(
        title="Test Job",
        company=company,
        location="Remote",
        type="full-time",
        description="Test Description",
        requirements=["Python", "Django"],
        benefits=["Health Insurance", "401k"],
        salary="$100k"
    )

@pytest.fixture
def user():
    return User.objects.create_user(
        username="testuser",
        email="test@example.com",
        password="testpass123"
    )

# Add any pytest fixtures here if needed 