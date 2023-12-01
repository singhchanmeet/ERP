from . models import InfrastructureForm, InfrastructureCategories
from . serializers import InfrastructureFormSerializer, InfrastructureCategoriesSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


def generate_item_id(ins, dept, item_type, categ, roomno):

    existing_items = len(InfrastructureForm.objects.filter(institute=ins, department=dept, item_type=item_type))

    id = f'{ins}/{dept}/{categ}/{roomno}/{item_type}/{existing_items+1}'
    return id


class InfrastructureFormView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        no_of_items = request.POST.get('numberOfUnits')

        institute = request.POST.get('institute')
        department = request.POST.get('department')
        room_category = request.POST.get('room_category')
        room_number = request.POST.get('room_number')
        item_type = request.POST.get('item_type')

        flag = True
        for i in range(int(no_of_items)):
            item_id = generate_item_id(institute, department, item_type, room_category, room_number)
            data = request.data
            data['item_id'] = item_id
            infrastructure_serializer = InfrastructureFormSerializer(data=data)
            if infrastructure_serializer.is_valid():
                infrastructure_serializer.save()

        return Response({'message': 'Details Submitted Successfully'}, status=status.HTTP_200_OK)
                

class InfrastructureCategoriesView(APIView):

    def get(self, request):
        queryset = InfrastructureCategories.objects.all()
        category_serializer = InfrastructureCategoriesSerializer(queryset, many=True)
        # print(category_serializer.data)
        return Response(category_serializer.data, status=status.HTTP_200_OK)

        