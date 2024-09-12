from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet

# Create a router and register the viewset
router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)

# The urlpatterns should include the router URLs
urlpatterns = [
    path('', include(router.urls)),
]