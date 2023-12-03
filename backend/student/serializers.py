from rest_framework import serializers
from .models import Student, StudentDetails
from batches.models import Batches
from authentication.serializers import UserSerializer


class StudentSerializer(serializers.ModelSerializer):

    # nesting UserSerializer to include user details within the Student serializer
    student_id = UserSerializer()

    class Meta:
        model = Student
        fields = '__all__'

    # overriding create method because the default create method does not support nested serializer relationship (User-Student OneToOneField)
    def create(self, validated_data):
        
        # taking User data from the validated_data
        user_data = validated_data.pop('student_id')
        # This will call UserSerializer which will create User record
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        # print(validated_data.pop('batch'))
        # batch = Batches.objects.get_or_create(batch=validated_data.pop('batch'))
        # now User is created so we can proceed to Student
        student = Student.objects.create(student_id=user, **validated_data)
        # now Student is also successfully created
        return student


class StudentDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentDetails
        fields = '__all__'
    
    
