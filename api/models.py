from django.db import models

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    rounded_amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    account = models.CharField(max_length=255)
    user = models.CharField(max_length=255)

    def __str__(self):
        return self.description


