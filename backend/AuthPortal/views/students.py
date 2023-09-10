from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..serializers.student_serializer import StudentSerializer
from ..serializers.user_serializer import UserSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.views import TokenObtainPairView


class StudentRegister(APIView):
    def post(self, request):
        # Serialize the data using UserSerializer for validation only
        user_serializer = UserSerializer(data=request.data)  

        if user_serializer.is_valid():
            
            student_data = {
                'student_id': {
                    "user_id": request.data['user_id'],
                    "name": request.data['name'],
                    "email": request.data['email'],
                    "role": "STUDENT",
                    "password": request.data['password']
                },   #foreign key
                'name': request.data['name'],
                'email': request.data['email'],
                'contact_number': request.data['contact_number'],
                'ip_address': request.META.get('REMOTE_ADDR')
            }

            # Serialize using StudentSerializer for validation and saving
            student_serializer = StudentSerializer(data=student_data)

            if student_serializer.is_valid():
                student_serializer.save()
                # This will create both User record and Student record because we have overwritten StudentSerializer's save method
                return Response({'message': 'Student registered successfully'}, status=status.HTTP_201_CREATED)
            else:
                print(student_serializer.errors)
                return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class StudentLogin(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Get the user_id and password from the request data
        user_id = request.data.get('user_id')  
        password = request.data.get('password')  

        # Authenticate the user
        user = authenticate(user_id=user_id, password=password)

        if user is not None:
            # Log the user in
            login(request, user)

            # Generate and return the token pair
            token = super().post(request, *args, **kwargs)
            return Response({'access_token': token.data['access']}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class StudentLogout(APIView):
    # only authenticated users can access this view
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # Perform the logout
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    
