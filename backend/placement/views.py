from django.shortcuts import render
from .models import Placements, Announcement
from .permissions import WriteByPlacement
from .serializers  import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.utils import timezone



# Create your views here.

class AllPlacementRecords(ModelViewSet):
    authentication_classes =[SessionAuthentication]
    permission_classes =[ WriteByPlacement ]
    serializer_class = PlacementSerializer
    queryset = Placements.objects.all()




class ViewAnnouncement(ModelViewSet):
    # authentication_classes = [BasicAuthentication]
    authentication_classes =[SessionAuthentication]
    permission_classes = [WriteByPlacement]
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()

    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'partial_update', 'destroy','retrieve']:
    #         self.permission_classes = [IsAuthenticated, WriteByPlacement]
    #     return super().get_permissions()



class PastPlacementRecords(ModelViewSet):
    # authentication_classes = [BasicAuthentication]
    authentication_classes =[SessionAuthentication]
    permission_classes = [ WriteByPlacement]
    serializer_class = PlacementSerializer
    queryset = Placements.objects.filter(date__lte=timezone.now())  


    
class ActivePlacementRecords(ModelViewSet):
    # authentication_classes = [BasicAuthentication]
    permission_classes = [ WriteByPlacement]
    serializer_class = PlacementSerializer
    queryset = Placements.objects.filter(date__gt=timezone.now()) 