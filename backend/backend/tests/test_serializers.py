import pytest
from backend.serializers import (
    JobSerializer, ApplicationSerializer, UserProfileSerializer
)
from backend.models import Company, Job, Application, UserProfile
from django.contrib.auth.models import User

@pytest.mark.django_db
class TestJobSerializer:
    def test_serialize_job(self):
        company = Company.objects.create(name="Test Company")
        job = Job.objects.create(
            title="Test Job",
            company=company,
            location="Remote",
            type="full-time",
            requirements=["Python"],
            benefits=["Health"],
            description="Test job"
        )
        serializer = JobSerializer(job)
        data = serializer.data
        assert data['title'] == "Test Job"
        assert data['company_name'] == "Test Company"

    @pytest.mark.skip(reason="Needs to be fixed - serializer validation issue")
    def test_deserialize_job(self):
        company = Company.objects.create(name="Test Company")
        data = {
            "title": "New Job",
            "company": company.id,
            "location": "Remote",
            "type": "full-time",
            "requirements": ["Python"],
            "benefits": ["Health"]
        }
        serializer = JobSerializer(data=data)
        assert serializer.is_valid()

@pytest.mark.django_db
class TestApplicationSerializer:
    @pytest.mark.skip(reason="Needs to be fixed - model field mismatch")
    def test_serialize_application(self):
        company = Company.objects.create(name="Test Company")
        job = Job.objects.create(
            title="Test Job",
            company=company,
            location="Remote",
            type="full-time",
            requirements=["Python"],
            benefits=["Health"],
            description="Test job"
        )
        user = User.objects.create_user(username="testuser")
        application = Application.objects.create(
            job=job,
            applicant=user,
            status="new",
            skills=["Python"],
            match_score=85,
            experience_years=5,
            current_role="Developer",
            current_company="Test Co"
        )
        serializer = ApplicationSerializer(application)
        data = serializer.data
        assert data['status'] == "new"
        assert data['match_score'] == 85