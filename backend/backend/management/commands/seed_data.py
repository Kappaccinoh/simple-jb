from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from backend.models import Company, Job, Application, UserProfile
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seed database with initial data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        
        # Create single company
        company_data = {
            "name": "TechFlow Solutions",
            "description": "Leading technology company specializing in innovative software solutions",
            "website": "https://techflow.com",
            "location": "San Francisco, CA (Remote-friendly)"
        }
        
        company, _ = Company.objects.get_or_create(
            name=company_data["name"],
            defaults=company_data
        )
            
        # Create 3 jobs for the same company
        jobs_data = [
            {
                "title": "Senior Frontend Developer",
                "company": company,
                "location": "Remote",
                "type": "full-time",
                "salary": "$120k - $150k",
                "description": "We're seeking a Senior Frontend Developer to build exceptional user experiences. You'll work with modern frameworks and lead frontend initiatives.",
                "requirements": [
                    "5+ years of experience with modern JavaScript frameworks",
                    "Strong understanding of React and Next.js",
                    "Experience with TypeScript",
                    "Understanding of web performance optimization",
                    "Experience with responsive design and CSS-in-JS"
                ],
                "benefits": [
                    "Competitive salary",
                    "Health insurance",
                    "Remote work",
                    "Learning budget",
                    "Stock options"
                ],
                "status": "active",
                "posted_date": timezone.now() - timedelta(days=5)
            },
            {
                "title": "Backend Engineer",
                "company": company,
                "location": "Remote",
                "type": "full-time",
                "salary": "$115k - $145k",
                "description": "Looking for a Backend Engineer to develop scalable services and APIs. You'll work with our cloud infrastructure and microservices architecture.",
                "requirements": [
                    "4+ years of backend development experience",
                    "Proficiency in Python and Django",
                    "Experience with RESTful APIs",
                    "Knowledge of database design and optimization",
                    "Understanding of cloud services (AWS/GCP)"
                ],
                "benefits": [
                    "Competitive salary",
                    "Health and dental",
                    "Remote work",
                    "401(k) matching",
                    "Flexible hours"
                ],
                "status": "active",
                "posted_date": timezone.now() - timedelta(days=3)
            },
            {
                "title": "Full Stack Developer",
                "company": company,
                "location": "Remote",
                "type": "full-time",
                "salary": "$130k - $160k",
                "description": "Seeking a Full Stack Developer to work across our entire technology stack. You'll build features end-to-end and collaborate with cross-functional teams.",
                "requirements": [
                    "5+ years of full stack development",
                    "Experience with React and Node.js",
                    "Strong Python/Django knowledge",
                    "Database design and optimization",
                    "Experience with cloud services"
                ],
                "benefits": [
                    "Top-tier salary",
                    "Comprehensive health coverage",
                    "Remote work",
                    "Stock options",
                    "Learning and development budget"
                ],
                "status": "active",
                "posted_date": timezone.now() - timedelta(days=1)
            }
        ]
        
        created_jobs = []
        for job_data in jobs_data:
            job = Job.objects.create(**job_data)
            created_jobs.append(job)
            
        # Rest of the code remains the same for users and applications
        users_data = [
            {
                "username": "johndoe",
                "email": "john.doe@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "profile": {
                    "phone": "+1 (555) 123-4567",
                    "bio": "Frontend expert with strong focus on React and TypeScript",
                    "skills": ["React", "TypeScript", "Next.js", "TailwindCSS"],
                    "experience_years": 6,
                    "current_role": "Frontend Lead",
                    "current_company": "Tech Corp",
                    "portfolio_url": "https://johndoe.dev",
                    "github_url": "https://github.com/johndoe",
                    "linkedin_url": "https://linkedin.com/in/johndoe"
                }
            },
            {
                "username": "janesmith",
                "email": "jane.smith@example.com",
                "first_name": "Jane",
                "last_name": "Smith",
                "profile": {
                    "phone": "+1 (555) 234-5678",
                    "bio": "Senior Software Engineer with full stack expertise",
                    "skills": ["React", "Node.js", "AWS", "MongoDB"],
                    "experience_years": 8,
                    "current_role": "Senior Software Engineer",
                    "current_company": "Big Tech Inc",
                    "github_url": "https://github.com/janesmith",
                    "linkedin_url": "https://linkedin.com/in/janesmith"
                }
            },
            {
                "username": "mikejohnson",
                "email": "mike.j@example.com",
                "first_name": "Mike",
                "last_name": "Johnson",
                "profile": {
                    "phone": "+1 (555) 345-6789",
                    "bio": "Frontend Developer specializing in modern JavaScript frameworks",
                    "skills": ["React", "Vue.js", "JavaScript", "CSS"],
                    "experience_years": 4,
                    "current_role": "Frontend Developer",
                    "current_company": "Startup Co",
                    "portfolio_url": "https://mikej.dev",
                    "linkedin_url": "https://linkedin.com/in/mikejohnson"
                }
            },
            {
                "username": "sarahwilliams",
                "email": "sarah.w@example.com",
                "first_name": "Sarah",
                "last_name": "Williams",
                "profile": {
                    "phone": "+1 (555) 456-7890",
                    "bio": "UI Engineer with strong design background",
                    "skills": ["React", "Figma", "UI/UX", "SASS"],
                    "experience_years": 5,
                    "current_role": "UI Engineer",
                    "current_company": "Design Studio",
                    "portfolio_url": "https://sarahw.design"
                }
            },
            {
                "username": "alexchen",
                "email": "alex.chen@example.com",
                "first_name": "Alex",
                "last_name": "Chen",
                "profile": {
                    "phone": "+1 (555) 567-8901",
                    "bio": "Full Stack Developer with focus on React and Django",
                    "skills": ["React", "Python", "Django", "PostgreSQL"],
                    "experience_years": 7,
                    "current_role": "Full Stack Developer",
                    "current_company": "Global Tech",
                    "github_url": "https://github.com/alexchen"
                }
            }
        ]
        
        for user_data in users_data:
            profile_data = user_data.pop('profile')
            user, created = User.objects.get_or_create(
                username=user_data["username"],
                defaults=user_data
            )
            if created:
                user.set_password('password123')
                user.save()
                UserProfile.objects.create(user=user, **profile_data)
                
        # Create applications
        applications_data = [
            {
                "job": created_jobs[0],  # Senior Frontend Developer role
                "applicant": User.objects.get(username="johndoe"),
                "status": "interviewed",
                "experience": 6,
                "current_role": "Frontend Lead",
                "current_company": "Tech Corp",
                "skills": ["React", "TypeScript", "Next.js", "TailwindCSS"],
                "match_score": 92
            },
            {
                "job": created_jobs[0],  # Senior Frontend Developer role
                "applicant": User.objects.get(username="janesmith"),
                "status": "accepted",
                "experience": 8,
                "current_role": "Senior Software Engineer",
                "current_company": "Big Tech Inc",
                "skills": ["React", "Node.js", "AWS", "MongoDB"],
                "match_score": 89
            },
            {
                "job": created_jobs[0],  # Senior Frontend Developer role
                "applicant": User.objects.get(username="mikejohnson"),
                "status": "rejected",
                "experience": 4,
                "current_role": "Frontend Developer",
                "current_company": "Startup Co",
                "skills": ["React", "Vue.js", "JavaScript", "CSS"],
                "match_score": 78
            },
            {
                "job": created_jobs[0],  # Senior Frontend Developer role
                "applicant": User.objects.get(username="sarahwilliams"),
                "status": "new",
                "experience": 5,
                "current_role": "UI Engineer",
                "current_company": "Design Studio",
                "skills": ["React", "Figma", "UI/UX", "SASS"],
                "match_score": 85
            },
            {
                "job": created_jobs[0],  # Senior Frontend Developer role
                "applicant": User.objects.get(username="alexchen"),
                "status": "reviewed",
                "experience": 7,
                "current_role": "Full Stack Developer",
                "current_company": "Global Tech",
                "skills": ["React", "Python", "Django", "PostgreSQL"],
                "match_score": 91
            }
        ]
        
        for app_data in applications_data:
            Application.objects.create(**app_data)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database')) 