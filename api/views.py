from rest_framework import viewsets
from .models import Transaction
from .serializers import TransactionSerializer

# This is a viewset, which is a way of abstracting the logic of views.
# It is a class-based view that provides actions like list, create, retrieve, update, and destroy

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
