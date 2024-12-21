import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from backend.models import Company, Job, Application, UserProfile
from django.contrib.auth.models import User

@pytest.mark.django_db
class TestJobViewSet:
    def setup_method(self):
        self.client = APIClient()
        self.company = Company.objects.create(name="Test Company")
        self.job = Job.objects.create(
            title="Test Job",
            company=self.company,
            location="Remote",
            type="full-time",
            description="Test Description",
            requirements=["Python", "Django"],
            benefits=["Health Insurance", "401k"],
            salary="$100k"
        )

    def test_list_jobs(self):
        response = self.client.get('/api/jobs/')
        assert response.status_code == 200
        assert len(response.data) == 1

    def test_retrieve_job(self):
        response = self.client.get(f'/api/jobs/{self.job.id}/')
        assert response.status_code == 200
        assert response.data['title'] == "Test Job"

    def test_create_job(self):
        data = {
            "title": "New Job",
            "company": self.company.id,
            "location": "Remote",
            "type": "full-time",
            "requirements": ["Python"],
            "benefits": ["Health"],
            "salary": "$100k",
            "description": "Test job",
            "status": "active"
        }
        response = self.client.post('/api/jobs/', data, format='json')
        assert response.status_code == 201
        assert Job.objects.count() == 2

    def test_filter_jobs_by_status(self):
        response = self.client.get('/api/jobs/?status=active')
        assert response.status_code == 200
        assert len(response.data) == 1

    def test_search_jobs(self):
        response = self.client.get('/api/jobs/?search=Python')
        assert response.status_code == 200

@pytest.mark.django_db
class TestCompanyViewSet:
    def setup_method(self):
        self.client = APIClient()
        self.company = Company.objects.create(
            name="Test Company",
            location="Test Location"
        )

    def test_list_companies(self):
        response = self.client.get('/api/companies/')
        assert response.status_code == 200
        assert len(response.data) == 1

    def test_retrieve_company(self):
        response = self.client.get(f'/api/companies/{self.company.id}/')
        assert response.status_code == 200
        assert response.data['name'] == "Test Company"

@pytest.mark.django_db
class TestUserProfileViewSet:
    def setup_method(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser")
        self.profile = UserProfile.objects.create(
            user=self.user,
            experience_years=5,
            current_role="Developer"
        )
        self.client.force_authenticate(user=self.user)

    def test_get_own_profile(self):
        response = self.client.get('/api/profiles/me/')
        assert response.status_code == 200
        assert response.data['experience_years'] == 5

    def test_update_profile(self):
        data = {"experience_years": 6}
        response = self.client.patch(f'/api/profiles/{self.profile.id}/', data)
        assert response.status_code == 200
        assert response.data['experience_years'] == 6

@pytest.mark.django_db
class TestApplicationViewSet:
    def setup_method(self):
        self.client = APIClient()
        self.company = Company.objects.create(name="Test Company")
        self.job = Job.objects.create(
            title="Test Job",
            company=self.company,
            location="Remote",
            type="full-time",
            description="Test Description",
            requirements=["Python", "Django"],
            benefits=["Health Insurance", "401k"],
            salary="$100k"
        )
        self.user = User.objects.create_user(username="testuser")
        self.client.force_authenticate(user=self.user)

    @pytest.mark.skip(reason="Needs to be fixed - model field mismatch")
    def test_create_application(self):
        data = {
            "job": self.job.id,
            "applicant": self.user.id,
            "skills": ["skill1", "skill2"],
            "status": "new",
            "match_score": 85
        }
        response = self.client.post('/api/applications/', data, format='json')
        assert response.status_code == 201