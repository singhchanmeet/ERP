from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Branches

class GetAllBranches(APIView):
    
    def get(self, request):
        # Retrieve all branches
        all_branches = Branches.objects.all()
        
        # Extract branch values from the queryset
        branch_values = [branch.branch for branch in all_branches]
        
        return Response({'branches': branch_values}, status=status.HTTP_200_OK)
