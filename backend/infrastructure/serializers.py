from rest_framework import serializers
from . models import InfrastructureCategories, InfrastructureForm

class InfrastructureFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfrastructureForm
        fields = '__all__'

class InfrastructureCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfrastructureCategories
        fields = '__all__'