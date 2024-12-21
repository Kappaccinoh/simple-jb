import pytest
from django.contrib.auth.models import User
from backend.models import Company, Job, Application, UserProfile, JobView
from datetime import datetime

@pytest.mark.django_db
class TestCompany:
    def test_create_company(self):
        company = Company.objects.create(
            name="Test Company",
            description="Test Description",
            website="https://test.com",
            location="Test Location"
        )
        assert company.name == "Test Company"
        assert str(company) == "Test Company"

    def test_update_company(self):
        company = Company.objects.create(name="Test Company")
        company.location = "New Location"
        company.save()
        assert company.location == "New Location"

    def test_delete_company(self):
        company = Company.objects.create(name="Test Company")
        company_id = company.id
        company.delete()
        assert not Company.objects.filter(id=company_id).exists()

@pytest.mark.django_db
class TestJob:
    @pytest.fixture
    def company(self):
        return Company.objects.create(name="Test Company")

    def test_create_job(self, company):
        job = Job.objects.create(
            title="Test Job",
            company=company,
            location="Remote",
            type="full-time",
            salary="$100k",
            description="Test Description",
            requirements=["Python", "Django"],
            benefits=["Health Insurance", "401k"]
        )
        assert job.title == "Test Job"
        assert str(job) == "Test Job at Test Company"

    def test_job_status_default(self, company):
        job = Job.objects.create(
            title="Test Job",
            company=company,
            location="Remote",
            type="full-time",
            requirements=["Python"],
            benefits=["Health"]
        )
        assert job.status == "active"

    def test_job_with_applications(self, company):
        job = Job.objects.create(
            title="Test Job",
            company=company,
            location="Remote",
            type="full-time",
            requirements=["Python"],
            benefits=["Health"]
        )
        user = User.objects.create_user(username="testuser")
        Application.objects.create(
            job=job,
            applicant=user,
            status="new",
            skills=["Python"],
            match_score=85
        )
        assert job.applications.count() == 1

@pytest.mark.django_db
class TestUserProfile:
    @pytest.fixture
    def user(self):
        return User.objects.create_user(
            username="testuser",
            email="test@example.com"
        )

    def test_create_profile(self, user):
        profile = UserProfile.objects.create(
            user=user,
            phone="+1234567890",
            bio="Test Bio",
            skills=["Python", "Django"],
            experience_years=5,
            current_role="Developer",
            current_company="Test Corp"
        )
        assert profile.user == user
        assert profile.experience_years == 5

    def test_update_profile(self, user):
        profile = UserProfile.objects.create(
            user=user,
            experience_years=5
        )
        profile.experience_years = 6
        profile.save()
        assert profile.experience_years == 6

@pytest.mark.django_db
class TestJobView:
    @pytest.fixture
    def job(self, company):
        return Job.objects.create(
            title="Test Job",
            company=company,
            location="Remote",
            type="full-time",
            requirements=["Python"],
            benefits=["Health"]
        )

    def test_create_job_view(self, job, user):
        job_view = JobView.objects.create(
            job=job,
            viewer=user,
            ip_address="127.0.0.1"
        )
        assert job_view.job == job
        assert job_view.viewer == user

    def test_job_view_timestamp(self, job, user):
        job_view = JobView.objects.create(
            job=job,
            viewer=user,
            ip_address="127.0.0.1"
        )
        assert job_view.viewed_at is not None 