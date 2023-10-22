from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UserSerializer
from django.http import HttpResponse
from . models import User
from student.views import StudentRegister, StudentLogin
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



"""
    When MS Azure redirects to /index , these are all the possibilities:
    1) Either it is post signin or post signout
    2) If it it post signin, then either it is a student or an employee
    3) In both cases either this is the first time signing in, or it is logging in for an existing record
"""

@api_view(['GET'])
def index(request):

    # if sign out
    if request.identity_context_data.authenticated == False:
        return redirect('http://localhost:3000/')

    # for employees (example: 1480000361)
    if len(request.identity_context_data.username) == 10:
        pass

    # for students (example: 01296402722)
    if len(request.identity_context_data.username) == 11:
        user = User.objects.filter(user_id=request.identity_context_data.username).first()
        # already existing record, redirect to login
        if user:
            return StudentLogin().msteams(request)
        # first time signing in, redirect to signin
        else:
            return StudentRegister().msteams(request)
            
    #some error  
    return Response({'error': 'Unexpected User ID'}, status=status.HTTP_400_BAD_REQUEST)