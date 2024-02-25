from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import Batches


# Create your views here.
class GetAllBatches(APIView):
    
    def get(self, request):
        
        # Retrieve all batches
        all_batches = Batches.objects.all()
        
        # Extract batch values from the queryset
        batch_values = [batch.batch for batch in all_batches]
        
        return Response({'batches': batch_values}, status=status.HTTP_200_OK)