from rest_framework import serializers
from .models import SplitPayment, StudentFees


class SplitPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = SplitPayment
        fields = '__all__'
    

class StudentFeesSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentFees
        fields = '__all__'
    
    
