from django.shortcuts import render
from .models import Placements, Announcement
from .permissions import WriteByPlacement
from .serializers  import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
# <<<<<<< HEAD
from rest_framework.authentication import SessionAuthentication
# =======
# from rest_framework.authentication import BasicAuthentication
# >>>>>>> e1a95461e4b99065c19c192056fad219777692d5
from django.utils import timezone



# Create your views here.

class AllPlacementRecords(ModelViewSet):
    authentication_classes =[SessionAuthentication]
    permission_classes =[ WriteByPlacement ]
# <<<<<<< HEAD
    authentication_classes =[SessionAuthentication]
    permission_classes =[ WriteByPlacement ]
# =======
    # authentication_classes =[BasicAuthentication]
    # permission_classes =[IsAuthenticated, WriteByPlacement ]
    # permission_classes =[IsAuthenticated, WriteByPlacement ]
# >>>>>>> e1a95461e4b99065c19c192056fad219777692d5
    serializer_class = PlacementSerializer
    queryset = Placements.objects.all()




class ViewAnnouncement(ModelViewSet):
    # authentication_classes = [BasicAuthentication]
    authentication_classes =[SessionAuthentication]
    permission_classes = [WriteByPlacement]
    # permission_classes = [IsAuthenticated, WriteByPlacement]
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
    # permission_classes = [IsAuthenticated, WriteByPlacement]
    serializer_class = PlacementSerializer
    queryset = Placements.objects.filter(date__lte=timezone.now())  


    
class ActivePlacementRecords(ModelViewSet):
    # authentication_classes = [BasicAuthentication]
# <<<<<<< HEAD
    permission_classes = [ WriteByPlacement]
    authentication_classes =[SessionAuthentication]
# =======
    # permission_classes = [IsAuthenticated, WriteByPlacement]
# >>>>>>> e1a95461e4b99065c19c192056fad219777692d5
    serializer_class = PlacementSerializer
    queryset = Placements.objects.filter(date__gt=timezone.now()) 