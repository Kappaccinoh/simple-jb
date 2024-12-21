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
        read_only_fields = ('views', 'created_at', 'updated_at')

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
    class Meta:
        model = Application
        fields = (
            'id', 'job', 'applicant', 'status', 'skills', 
            'experience_years', 'current_role', 'current_company',
            'match_score', 'applied_date', 'updated_at'
        )
        read_only_fields = ('applied_date', 'updated_at')

    def create(self, validated_data):
        if 'match_score' not in validated_data:
            validated_data['match_score'] = 0
        return super().create(validated_data)

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