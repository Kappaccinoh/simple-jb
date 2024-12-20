from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Company(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Job(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('draft', 'Draft'),
        ('closed', 'Closed'),
    ]
    TYPE_CHOICES = [
        ('full-time', 'Full Time'),
        ('part-time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
    ]

    title = models.CharField(max_length=200)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='jobs')
    location = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    salary = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.JSONField()  # Store as list
    benefits = models.JSONField()      # Store as list
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    posted_date = models.DateTimeField(default=timezone.now)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company.name}"

class Application(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('reviewed', 'Reviewed'),
        ('interviewed', 'Interviewed'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    experience = models.IntegerField()
    current_role = models.CharField(max_length=200)
    current_company = models.CharField(max_length=200)
    skills = models.JSONField()  # Store as list
    portfolio_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    match_score = models.IntegerField(default=0)  # AI-calculated match score
    applied_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.applicant.get_full_name()} - {self.job.title}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True)
    bio = models.TextField(blank=True)
    skills = models.JSONField(default=list)  # Store as list
    experience_years = models.IntegerField(default=0)
    current_role = models.CharField(max_length=200, blank=True)
    current_company = models.CharField(max_length=200, blank=True)
    portfolio_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    resume = models.FileField(upload_to='resumes/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.get_full_name()

class JobView(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='job_views')
    viewer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    viewed_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['job', 'viewed_at']),
        ]
