from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from authentication.models import User
from .serializers import StudentSerializer
from authentication.serializers import UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken



class StudentRegister(APIView):

    #To register a student without MS teams, a post request will be sent from frontend
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
                    "is_teams_user": False,
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
                return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    #To register a student with MS teams, we will call this function because a post request can't be sent
    def msteams(self, request):

        student_id = {
            "user_id": request.identity_context_data.username,
            "name": request.identity_context_data.username,
            "email": request.identity_context_data._id_token_claims['preferred_username'],
            "role": "STUDENT",
            "is_teams_user": True
        }

        # Serialize the data using UserSerializer for validation only
        user_serializer = UserSerializer(data=student_id)  

        if user_serializer.is_valid():
            
            student_data = {
                'student_id': student_id,   #foreign key
                'name': request.identity_context_data.username,
                'email': request.identity_context_data._id_token_claims['preferred_username'],
                'ip_address': request.META.get('REMOTE_ADDR')
            }

            # Serialize using StudentSerializer for validation and saving
            student_serializer = StudentSerializer(data=student_data)

            if student_serializer.is_valid():
                student_serializer.save()
                # This will create both User record and Student record because we have overwritten StudentSerializer's save method
                return Response({'message': 'Student registered successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class StudentLogin(TokenObtainPairView):

    #To login a student without MS teams, a post request will be sent from frontend
    def post(self, request, *args, **kwargs):

        # Get the user_id and password from the request data
        user_id = request.data.get('user_id')  
        password = request.data.get('password')  

        # Authenticate the user
        user = authenticate(user_id=user_id, password=password)

        if user is not None:

            # Log the user in
            # (i.e. Associate the user with the current request)
            login(request, user)

            # Generate and return the token pair by delegating to parent class's post method
            token = super().post(request, *args, **kwargs)
            # super is the parent class (TokenObtainPairView)
            # so we are calling parent class's post method to generate a token for the user associated with the request

            return Response(token.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


    # manual token generation function
    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


    #To login a student with MS teams, this function will be called because a post request can't be sent
    def msteams(self, request, *args, **kwargs):

        # Get the user_id from the request data
        user_id = request.identity_context_data.username   

        # Retrieve or create a user based on the identity data
        user, created = User.objects.get_or_create(user_id=user_id)
        # If a new user was created, created is True; otherwise, if an existing user was retrieved, created is False

        if user is not None:

            # Just to update the last login field in the db everytime user logs in via ms teams
            login(request, user)

            # Generate and return the token pair
            token = self.get_tokens_for_user(user)    
            # since the parent class's post method takes both user_id and password so we can't use that method here
            # so instead we are using our own get_tokens_for_user method

            return Response(token, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


        
