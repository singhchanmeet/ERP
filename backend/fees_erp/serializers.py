from rest_framework import serializers
from .models import SplitPayment


class SplitPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = SplitPayment
        fields = '__all__'
    
    
