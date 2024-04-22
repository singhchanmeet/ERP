from rest_framework import serializers
from .models import SplitPayment, StudentFees,BilldeskOrders,BilldeskTransactions,Fees


class SplitPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = SplitPayment
        fields = '__all__'
    

class StudentFeesSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentFees
        fields = '__all__'
    
    
class FeesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Fees
        fields='__all__'
    
   
class billdeskorderSerializer(serializers.ModelSerializer):
    class Meta:
        model=BilldeskOrders
        fields='__all__'
    
   
class billdesktransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model=BilldeskTransactions
        fields='__all__'

