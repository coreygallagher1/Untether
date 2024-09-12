# Used to define how models should be converted to JSON format, which is needed for the API to work.

from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'amount', 'rounded_amount', 'date', 'description', 'category', 'account', 'user')