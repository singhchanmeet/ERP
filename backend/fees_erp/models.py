from django.db import models
from batches.models import Batches
from authentication.models import User
from batches.models import Batches
from groups.models import Groups
from branches.models import Branches

# for split payment application and approval
class SplitPayment(models.Model):
    
    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, db_column='student')
    application = models.TextField()
    document1 = models.FileField(blank=True, upload_to='student/fees')
    document2 = models.FileField(blank=True, upload_to='student/fees')
    document3 = models.FileField(blank=True, upload_to='student/fees')
    
    allow_split_payment = models.BooleanField(default=False)
    
    
    class Meta:
        db_table = 'split_payment_approval'  
        verbose_name_plural = "Split Payment Approval"

# for mapping fees with student,  his batch,group,branch etc.
class StudentFees(models.Model):
    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, db_column='student')
    
    enrollment_number = models.CharField(max_length=25)
    batch = models.ForeignKey(Batches, on_delete=models.SET_NULL, null=True, db_column='batch')
    group = models.ForeignKey(Groups, on_delete=models.SET_NULL, null=True, db_column='group')
    branch = models.ForeignKey(Branches, on_delete=models.SET_NULL, null=True, db_column='branch')
    
    order_id = models.CharField(max_length=25)
    transaction_id = models.CharField(max_length=25)
    transaction_amount = models.CharField(max_length=12)
    transaction_status = models.CharField(max_length=25)
    payment_method = models.CharField(max_length=25)
    transaction_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_fees'  
        verbose_name_plural = "Student Fees"
    
       

# for displaying fees batch wise
class Fees(models.Model):

    batch = models.OneToOneField(Batches, on_delete=models.SET_NULL, null=True, db_column='batch')

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
        db_table = 'erp_fees'  
        verbose_name_plural = "Fees"
    


class BilldeskOrders(models.Model):
    
    order_id = models.CharField(max_length=25)
    bd_order_id = models.CharField(max_length=25)
    order_amount = models.CharField(max_length=12)
    order_time = models.DateTimeField(auto_now_add=True)
    order_response = models.TextField()
    
    class Meta:
        db_table = 'erp_billdesk_orders'
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
        db_table = 'erp_billdesk_transactions'
        verbose_name_plural = 'Billdesk Transactions'