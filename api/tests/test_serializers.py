from django.test import TestCase
from ..models import Transaction
from ..serializers import TransactionSerializer

class TransactionSerializerTest(TestCase):
    def setUp(self):
        self.transaction_data = {
            'id': 1,
            'amount': 50.75,
            'rounded_amount': 51.00,
            'description': 'Grocery shopping',
            'category': 'Groceries',
            'account': 'Checking Account',
            'user': 'john_doe'
        }
        self.transaction = Transaction.objects.create(**self.transaction_data)
        self.serializer = TransactionSerializer(instance=self.transaction)

    def test_serializer_fields(self):
        # Ensure the serializer has all the expected fields
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(['id', 'amount', 'rounded_amount', 'description', 'category', 'account', 'user', 'date']))

    def test_serializer_content(self):
        # Ensure the serializer outputs the correct content
        data = self.serializer.data
        self.assertEqual(data['amount'], '50.75')
        self.assertEqual(data['description'], 'Grocery shopping')

    def test_serializer_validation(self):
        # Test if the serializer correctly validates input
        invalid_data = self.transaction_data.copy()
        invalid_data['amount'] = 'invalid'
        serializer = TransactionSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('amount', serializer.errors)