from rest_framework import serializers
from . models import InfrastructureForm

class InfrastructureFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfrastructureForm
        fields = '__all__'
