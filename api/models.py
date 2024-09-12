from django.db import models
from django.core.validators import MinValueValidator

class Transaction(models.Model):
    amount = models.DecimalField(
        max_digits=10, decimal_places=2,
        validators=[MinValueValidator(0.01)]  # Enforce positive value
    )
    rounded_amount = models.DecimalField(
        max_digits=10, decimal_places=2,
        validators=[MinValueValidator(0.01)]  # Enforce positive value
    )
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    account = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description