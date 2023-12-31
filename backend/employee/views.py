from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from authentication.models import User
from rest_framework.permissions import IsAuthenticated
from . serializers import EmployeeSerializer, EmployeeDetailsSerializer
from authentication.serializers import UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect
import jwt
from . models import EmployeeDetails
from . permissions import IsEmployee

import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env() 


class EmployeeRegister(APIView):

    #To register a employee with MS teams, we will call this function because a post request can't be sent
    def msteams(self, request, email):

        token = request.identity_context_data._access_token
        decoded_token = jwt.decode(token , options={"verify_signature": False})

        given_name = decoded_token.get('given_name')
        family_name = decoded_token.get('family_name')

        full_name = f"{given_name} {family_name}" if family_name is not None else f"{given_name} "      
        #because everyone doesnt have a family name just like aman

        employee = {
            "user_id": email,
            "name": full_name,
            "email": email,
            "role": "EMPLOYEE",
            "is_teams_user": True
        }

        # Serialize the data using UserSerializer for validation only
        user_serializer = UserSerializer(data=employee)  

        if user_serializer.is_valid():
            
            employee_data = {
                'employee_id': employee,   #foreign key
                'name': full_name,
                'email': email,
                'ip_address': request.META.get('REMOTE_ADDR')
            }

            # Serialize using EmployeeSerializer for validation and saving
            employee_serializer = EmployeeSerializer(data=employee_data)

            if employee_serializer.is_valid():
                employee_serializer.save()
                # This will create both User record and Employee record because we have overwritten EmployeeSerializer's save method
                # return Response({'message': 'Employee registered successfully'}, status=status.HTTP_201_CREATED)
                return EmployeeLogin().msteams(request, email=email)    #after successful registration, login the user too
            else:
                return Response(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class EmployeeLogin(TokenObtainPairView):

    # manual token generation function
    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


    #To login a employee with MS teams, this function will be called because a post request can't be sent
    def msteams(self, request, *args, **kwargs):

        # Get the email from the passed keyword arguement
        email = kwargs.get('email')

        # Retrieve or create a user based on the identity data
        user, created = User.objects.get_or_create(email=email)
        # If a new user was created, created is True; otherwise, if an existing user was retrieved, created is False

        if user is not None:

            # Just to update the last login field in the db everytime user logs in via ms teams
            login(request, user)

            # Generate and return the token pair
            token = self.get_tokens_for_user(user)    
            # since the parent class's post method takes both user_id and password so we can't use that method here
            # so instead we are using our own get_tokens_for_user method
            
            redirect_url = f"{env('REDIRECT_URL')}call_back/?status=success&&access_token={token['access']}&&refresh_token={token['refresh']}"
            return redirect(redirect_url)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


        
     
class EmployeeDetailsView(APIView):

    # only authenticated students can access this view
    permission_classes = (IsAuthenticated, IsEmployee)

    # For submitting personal details of employee
    def post(self, request):

        employee = EmployeeDetails.objects.filter(employee_id=request.data.get('employee_id')).first()

        if employee:
            # If the record exists, update it with the new data
            employee_serializer = EmployeeDetailsSerializer(employee, data=request.data)
        else:
            # If the record doesn't exist, create a new record
            employee_serializer = EmployeeDetailsSerializer(data=request.data)

        if employee_serializer.is_valid():
            employee_serializer.save()
            # after successful saving, update user_id in User table
            current_employee = request.user
            current_employee.user_id = request.data.get('employee_id')
            current_employee.save()
            # Because the user_id has just changed so the access token is invalid
            # so regenerating tokens
            token = EmployeeLogin().get_tokens_for_user(current_employee)
            return Response(token, status=status.HTTP_200_OK)
        else:
            return Response(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    
    # For fetching personal details of employee
    def get(self, request):

        employee_id = request.user.user_id
        employee = EmployeeDetails.objects.filter(employee_id=employee_id).first()

        if employee:
            serializer = EmployeeDetailsSerializer(employee)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Employee details not found'}, status=status.HTTP_204_NO_CONTENT)
    