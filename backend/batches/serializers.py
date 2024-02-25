from rest_framework import serializers
from .models import Batches

class BatchesSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Batches
        fields = '__all__'