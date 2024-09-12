from django.test import TestCase
from ..models import Transaction
from django.core.exceptions import ValidationError

class TransactionModelTest(TestCase):
    def setUp(self):
        # This method is run before each test
        self.transaction = Transaction.objects.create(
            id= 1,
            amount=100.50,
            rounded_amount=101.00,
            description="Test transaction",
            category="Groceries",
            account="Checking",
            user="john_doe"
        )

    def test_transaction_creation(self):
        # Ensure the transaction was created properly
        self.assertEqual(self.transaction.amount, 100.50)
        self.assertEqual(self.transaction.description, "Test transaction")

    def test_string_representation(self):
        # Optional: Test if your model has a custom string representation
        self.assertEqual(str(self.transaction), "Test transaction")

    def test_field_types(self):
        self.assertIsInstance(self.transaction.amount, float)
        self.assertIsInstance(self.transaction.description, str)

    def test_amount_positive(self):
        transaction = Transaction(
            amount=-100.00,  # Invalid negative value
            rounded_amount=101.00,
            description="Invalid transaction",
            category="Groceries",
            account="Checking",
            user="john_doe"
        )

        # Trigger validation and expect a ValidationError
        with self.assertRaises(ValidationError):
            transaction.full_clean()  # Call full_clean() to validate the model
            transaction.save()

    def test_default_values(self):
        self.assertIsNotNone(self.transaction.date)  # Assuming there's a 'date' field with auto_now_add

    def test_transaction_update(self):
        self.transaction.amount = 200.00
        self.transaction.save()
        self.assertEqual(self.transaction.amount, 200.00)

    def test_transaction_deletion(self):
        self.transaction.delete()
        self.assertEqual(Transaction.objects.count(), 0)