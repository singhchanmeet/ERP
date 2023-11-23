from rest_framework import serializers
from .models import Employee, EmployeeDetails
from authentication.serializers import UserSerializer


class EmployeeSerializer(serializers.ModelSerializer):

    # nesting UserSerializer to include user details within the Employee serializer
    employee_id = UserSerializer()

    class Meta:
        model = Employee
        fields = '__all__'

    # overriding create method because the default create method does not support nested serializer relationship (User-Employee OneToOneField)
    def create(self, validated_data):
        
        # taking User data from the validated_data
        user_data = validated_data.pop('employee_id')
        # This will call UserSerializer which will create User record
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        # now User is created so we can proceed to Employee
        employee = Employee.objects.create(employee_id=user, **validated_data)
        # now Employee is also successfully created
        return employee


class EmployeeDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployeeDetails
        fields = '__all__'
    
    
