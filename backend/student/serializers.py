from rest_framework import serializers
from .models import Student, StudentDetails
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
        # now User is created so we can proceed to Student
        student = Student.objects.create(student_id=user, **validated_data)
        # now Student is also successfully created
        return student


class StudentDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentDetails
        fields = '__all__'

    def create(self, validated_data):

        # Use enrollment_number to search for existing record
        # If exists, update fields with the validated_data. If doesn't exist, create record with the validated_data
        instance, created = StudentDetails.objects.update_or_create(
            enrollment_number=validated_data['enrollment_number'],
            defaults=validated_data 
        )

        return instance