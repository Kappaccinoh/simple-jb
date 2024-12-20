from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

class JobViewSet(viewsets.ViewSet):
    def list(self, request):
        # Mock data for now
        jobs = [
            {
                "id": 1,
                "title": "Senior Frontend Developer",
                "company": "Tech Corp",
                "location": "Remote",
                "type": "Full-time",
                "status": "active",
                "posted": "2024-02-15",
                "applicants": {
                    "total": 24,
                    "new": 12,
                    "reviewed": 8
                }
            },
            {
                "id": 2,
                "title": "Full Stack Engineer",
                "company": "StartupCo",
                "location": "Hybrid",
                "type": "Full-time",
                "status": "active",
                "posted": "2024-02-14",
                "applicants": {
                    "total": 15,
                    "new": 5,
                    "reviewed": 10
                }
            }
        ]
        return Response(jobs)

    def retrieve(self, request, pk=None):
        # Mock single job data
        job = {
            "id": int(pk),
            "title": "Senior Frontend Developer",
            "company": "Tech Corp",
            "location": "Remote",
            "type": "Full-time",
            "salary": "$120k - $150k",
            "posted": "2024-02-15",
            "description": "We are looking for a Senior Frontend Developer...",
            "requirements": [
                "5+ years of experience with modern JavaScript frameworks",
                "Strong understanding of web fundamentals"
            ],
            "benefits": [
                "Competitive salary",
                "Health insurance"
            ],
            "status": "active",
            "applicants": []
        }
        return Response(job)

class ApplicationViewSet(viewsets.ViewSet):
    def create(self, request):
        # Handle job application submission
        return Response({"message": "Application submitted successfully"}, status=status.HTTP_201_CREATED)

    def list(self, request):
        # List applications for a job or user
        applications = [
            {
                "id": 1,
                "job_id": 1,
                "status": "new",
                "applied_date": "2024-02-15"
            }
        ]
        return Response(applications)

@api_view(['GET'])
def dashboard_stats(request):
    stats = {
        "total_jobs": 10,
        "active_jobs": 8,
        "total_applications": 245,
        "new_applications": 12
    }
    return Response(stats)