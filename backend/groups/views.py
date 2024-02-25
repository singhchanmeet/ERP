from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Groups

class GetAllGroups(APIView):
    
    def get(self, request):
        # Retrieve all groups
        all_groups = Groups.objects.all()
        
        # Extract group names from the queryset
        group_names = [group.group_name for group in all_groups]
        
        return Response({'groups': group_names}, status=status.HTTP_200_OK)
