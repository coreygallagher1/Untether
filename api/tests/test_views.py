from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import Transaction

class TransactionAPITest(APITestCase):
    def setUp(self):
        self.transaction = Transaction.objects.create(
            id= 1,
            amount=100.50,
            rounded_amount=101.00,
            description="Test transaction",
            category="Groceries",
            account="Checking",
            user="john_doe"
        )
        self.url = reverse('transaction-list')  # Replace with the actual name if different

    def test_get_transactions(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Only one transaction should exist

    def test_get_empty_transactions(self):
        Transaction.objects.all().delete()  # Delete all transactions to create an empty list scenario
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # Expect an empty list

    def test_post_transaction(self):
        data = {
            'amount': 50.75,
            'rounded_amount': 51.00,
            'description': 'New transaction',
            'category': 'Groceries',
            'account': 'Checking',
            'user': 'jane_doe'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Transaction.objects.count(), 2)

    def test_post_invalid_transaction(self):
        # Missing the 'user' field
        data = {
            'amount': 50.75,
            'rounded_amount': 51.00,
            'description': 'New transaction',
            'category': 'Groceries',
            'account': 'Checking'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Transaction.objects.count(), 1)

    def test_post_missing_fields(self):
        data = {
            'rounded_amount': 51.00,
            'description': 'New transaction',
            'category': 'Groceries',
            'account': 'Checking'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('amount', response.data)  # Ensure 'amount' is mentioned in the error response

    def test_put_transaction(self):
        url = reverse('transaction-detail', args=[self.transaction.id])
        data = {
            'amount': 200.00,
            'rounded_amount': 201.00,
            'description': 'Updated transaction',
            'category': 'Groceries',
            'account': 'Checking',
            'user': 'john_doe'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.transaction.refresh_from_db()
        self.assertEqual(self.transaction.amount, 200.00)
        self.assertEqual(self.transaction.description, 'Updated transaction')

    def test_put_invalid_transaction(self):
        url = reverse('transaction-detail', args=[self.transaction.id])
        # Missing the 'user' field
        data = {
            'amount': 200.00,
            'rounded_amount': 201.00,
            'description': 'Updated transaction',
            'category': 'Groceries',
            'account': 'Checking'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.transaction.refresh_from_db()
        self.assertNotEqual(self.transaction.amount, 200.00)

    def test_patch_transaction(self):
        url = reverse('transaction-detail', args=[self.transaction.id])
        data = {'amount': 150.00}  # Only updating the amount field
        response = self.client.patch(url, data, format='json')  # Use PATCH for partial update
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.transaction.refresh_from_db()
        self.assertEqual(self.transaction.amount, 150.00)  # Amount should be updated
        self.assertEqual(self.transaction.description, 'Test transaction')  # Other fields unchanged

    def test_patch_invalid_transaction(self):
        url = reverse('transaction-detail', args=[self.transaction.id])
        # Invalid amount value
        data = {'amount': 'invalid'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.transaction.refresh_from_db()
        self.assertNotEqual(self.transaction.amount, 'invalid')

    def test_delete_transaction(self):
        url = reverse('transaction-detail', args=[self.transaction.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Transaction.objects.count(), 0)

    def test_delete_nonexistent_transaction(self):
        # 9999 is not a valid transaction ID
        url = reverse('transaction-detail', args=[9999])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_options_transaction(self):
        response = self.client.options(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_head_transaction(self):
        response = self.client.head(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
