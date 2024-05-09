from django.db import models


# for mapping fees with student,  his batch,group,branch etc.
class StudentFees(models.Model):
    student_name = models.CharField(max_length=100)
    
    enrollment_number = models.CharField(max_length=25)
    batch = models.CharField(max_length=10)
    branch = models.CharField(max_length=100)
    
    order_id = models.CharField(max_length=25)
    transaction_id = models.CharField(max_length=25)
    transaction_amount = models.CharField(max_length=12)
    transaction_status = models.CharField(max_length=25)
    payment_method = models.CharField(max_length=25)
    transaction_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_fees'  
        verbose_name_plural = "Student Fees"


class Fees(models.Model):

    batch = models.CharField(max_length=10)

    tution_fee = models.CharField(max_length=8, default="0")
    activity_fee = models.CharField(max_length=8, default="0")
    university_fee = models.CharField(max_length=8, default="0")
    security_fee = models.CharField(max_length=8, default="0")
    college_magazine = models.CharField(max_length=8, default="0")
    rechecking_fee = models.CharField(max_length=8, default="0")
    reappear_fee = models.CharField(max_length=8, default="0")
    fine = models.CharField(max_length=8, default="0")
    institute_alumni_contribution = models.CharField(max_length=8, default="0")
    book_bank = models.CharField(max_length=8, default="0")

    total_fee = models.CharField(max_length=8, blank=True, null=True)

    # Boolean fields for displaying fees
    display_tution_fee = models.BooleanField(default=True)
    display_activity_fee = models.BooleanField(default=True)
    display_university_fee = models.BooleanField(default=True)
    display_security_fee = models.BooleanField(default=True)
    display_college_magazine = models.BooleanField(default=True)
    display_rechecking_fee = models.BooleanField(default=True)
    display_reappear_fee = models.BooleanField(default=True)
    display_fine = models.BooleanField(default=True)
    display_institute_alumni_contribution = models.BooleanField(default=True)
    display_book_bank = models.BooleanField(default=True)

    # This will be called on creation/updation
    def save(self, *args, **kwargs):
        # Calculate total fee based on the values of other fee-related fields
        total = 0
        fields_to_sum = [
            self.tution_fee, self.activity_fee, self.university_fee,
            self.security_fee, self.college_magazine, self.rechecking_fee,
            self.reappear_fee, self.fine, self.institute_alumni_contribution,
            self.book_bank
        ]

        # Convert non-empty fields to integers and sum them up
        for field in fields_to_sum:
            if field and field.isdigit():
                total += int(field)

        # Save the total fee value
        self.total_fee = str(total)
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'fees'  
        verbose_name_plural = "Fees"



class BilldeskOrders(models.Model):
    
    order_id = models.CharField(max_length=25)
    bd_order_id = models.CharField(max_length=25)
    order_amount = models.CharField(max_length=12)
    order_time = models.DateTimeField(auto_now_add=True)
    order_response = models.TextField()
    
    class Meta:
        db_table = 'billdesk_orders'
        verbose_name_plural = 'Billdesk Orders'


class BilldeskTransactions(models.Model):
    
    order_id = models.CharField(max_length=25)
    transaction_id = models.CharField(max_length=25)
    transaction_amount = models.CharField(max_length=12)
    transaction_status = models.CharField(max_length=25)
    payment_method = models.CharField(max_length=25)
    transaction_time = models.DateTimeField(auto_now_add=True)
    transaction_response = models.TextField()
    
    class Meta:
        db_table = 'billdesk_transactions'
        verbose_name_plural = 'Billdesk Transactions'