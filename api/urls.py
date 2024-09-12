from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)  # Register the viewset

urlpatterns = [
    path('api/', include(router.urls)),  # Include the API URLs
]