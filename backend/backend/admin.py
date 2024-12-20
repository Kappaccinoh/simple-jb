from django.contrib import admin
from .models import Company, Job, Application, UserProfile, JobView

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'created_at')
    search_fields = ('name', 'location')

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'type', 'status', 'posted_date')
    list_filter = ('status', 'type', 'company')
    search_fields = ('title', 'company__name', 'location')

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('applicant', 'job', 'status', 'match_score', 'applied_date')
    list_filter = ('status', 'applied_date')
    search_fields = ('applicant__username', 'job__title')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'current_role', 'current_company', 'experience_years')
    search_fields = ('user__username', 'current_company')

@admin.register(JobView)
class JobViewAdmin(admin.ModelAdmin):
    list_display = ('job', 'viewer', 'viewed_at', 'ip_address')
    list_filter = ('viewed_at',) 