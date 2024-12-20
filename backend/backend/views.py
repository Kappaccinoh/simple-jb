from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Company, Job, Application, UserProfile, JobView
from .serializers import (
    CompanySerializer, JobSerializer, JobDetailSerializer,
    ApplicationSerializer, ApplicationDetailSerializer,
    UserProfileSerializer, JobViewSerializer
)

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'location']

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'company__name', 'location', 'type']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return JobDetailSerializer
        return JobSerializer

    def get_queryset(self):
        queryset = Job.objects.select_related('company').prefetch_related('applications')
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):
        job = self.get_object()
        application = Application.objects.create(
            job=job,
            applicant=request.user,
            skills=request.data.get('skills', [])
        )
        return Response(ApplicationSerializer(application).data)

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Application.objects.all()
            
class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=user)

    @action(detail=False, methods=['get'])
    def me(self, request):
        profile = get_object_or_404(UserProfile, user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

class JobViewViewSet(viewsets.ModelViewSet):
    queryset = JobView.objects.all()
    serializer_class = JobViewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            viewer=self.request.user,
            ip_address=self.request.META.get('REMOTE_ADDR')
        )