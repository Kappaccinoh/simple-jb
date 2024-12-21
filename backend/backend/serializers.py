from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Company, Job, Application, UserProfile, JobView

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    application_stats = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = (
            'id', 'title', 'company', 'company_name', 'location', 
            'type', 'salary', 'description', 'requirements', 
            'benefits', 'status', 'posted_date', 'views',
            'application_stats', 'created_at', 'updated_at'
        )

    def get_application_stats(self, obj):
        applications = obj.applications.all()
        return {
            'total': applications.count(),
            'new': applications.filter(status='new').count(),
            'reviewed': applications.filter(status='reviewed').count(),
            'interviewed': applications.filter(status='interviewed').count(),
            'accepted': applications.filter(status='accepted').count(),
            'rejected': applications.filter(status='rejected').count(),
        }

class ApplicationSerializer(serializers.ModelSerializer):
    applicant = serializers.SerializerMethodField()
    job = JobSerializer()

    class Meta:
        model = Application
        fields = (
            'id', 'job', 'applicant', 'status', 'match_score', 
            'applied_date', 'updated_at'
        )

    def get_applicant(self, obj):
        profile = UserProfile.objects.get(user=obj.applicant)
        return {
            'first_name': obj.applicant.first_name,
            'last_name': obj.applicant.last_name,
            'email': obj.applicant.email,
            'current_role': profile.current_role,
            'current_company': profile.current_company,
            'experience_years': profile.experience_years,
            'skills': profile.skills,
            'portfolio_url': profile.portfolio_url,
            'github_url': profile.github_url,
            'linkedin_url': profile.linkedin_url,
            'bio': profile.bio,
            'phone': profile.phone
        }

class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            'id', 'user', 'full_name', 'email', 'phone', 'bio',
            'skills', 'experience_years', 'current_role', 'current_company',
            'portfolio_url', 'github_url', 'linkedin_url', 'resume',
            'created_at', 'updated_at'
        )
        read_only_fields = ('created_at', 'updated_at')

class JobViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobView
        fields = ('id', 'job', 'viewer', 'viewed_at', 'ip_address')
        read_only_fields = ('viewed_at',)

# Nested serializers for detailed views
class JobDetailSerializer(JobSerializer):
    applications = ApplicationSerializer(many=True, read_only=True)
    company = CompanySerializer(read_only=True)

    class Meta(JobSerializer.Meta):
        fields = JobSerializer.Meta.fields + ('applications',)

class ApplicationDetailSerializer(ApplicationSerializer):
    job = JobSerializer(read_only=True)
    applicant = UserSerializer(read_only=True)

    class Meta(ApplicationSerializer.Meta):
        fields = ApplicationSerializer.Meta.fields + ('job', 'applicant')