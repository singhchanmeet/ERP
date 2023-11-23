from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UserSerializer
from django.http import HttpResponse
from . models import User
from student.views import StudentRegister, StudentLogin
from employee.views import EmployeeRegister, EmployeeLogin
from django.shortcuts import redirect



class UserDetails(APIView):

    # only authenticated users can access this view
    permission_classes = (IsAuthenticated,)

    # For fetching details of the logged in user, whether student or employee or admin
    def get(self, request):

        user = request.user
        serializer_data = UserSerializer(user).data
        serializer_data.pop('password')  # Remove the password from the serialized data
        return Response(serializer_data, status=status.HTTP_200_OK)



def extract_number_from_email(email):
    parts = email.split('@')  # Split the email address by '@'
    
    if len(parts) == 2:
        number_part = parts[0][-11:]  # Take the last 11 characters from the first part
        return number_part if number_part.isdigit() else None
    else:
        return None



"""
    When MS Azure redirects to /index , these are all the possibilities:
    1) Either it is post signin or post signout
    2) If it it post signin, then either it is a student or an employee
    3) In both cases either this is the first time signing in, or it is logging in for an existing record
"""

@api_view(['GET'])
def handle_ms_login(request):

    # if sign out
    if request.identity_context_data.authenticated == False:
        return redirect('http://localhost:3000/')

    email = request.identity_context_data._id_token_claims.get('preferred_username')

    enrollment_id = extract_number_from_email(email)

    # for students (example: chanmeet.01296402722@cse.mait.ac.in)
    if enrollment_id:
        user = User.objects.filter(user_id=enrollment_id).first()
        # already existing record, redirect to login
        if user:
            return StudentLogin().msteams(request, enrollment_id=enrollment_id)
        # first time signing in, redirect to signin
        else:
            return StudentRegister().msteams(request, enrollment_id=enrollment_id)
        
    # for employees (example: alok@mait.ac.in)
    else:
        # for employees, we have to check by email because no employee_id is returned by microsoft
        user = User.objects.filter(email=email).first()
        # already existing record, redirect to login
        if user:
            return EmployeeLogin().msteams(request, email=email)
        # first time signing in, redirect to signin
        else:
            return EmployeeRegister().msteams(request, email=email)
            
    #some error  
    return Response({'error': 'Unexpected User ID'}, status=status.HTTP_400_BAD_REQUEST)