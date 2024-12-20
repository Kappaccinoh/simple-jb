from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    CompanyViewSet, JobViewSet, ApplicationViewSet,
    UserProfileViewSet, JobViewViewSet
)

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'applications', ApplicationViewSet, basename='application')
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'job-views', JobViewViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]