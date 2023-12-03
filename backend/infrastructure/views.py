from . models import InfrastructureForm, Institutes, Departments, Rooms, RoomCategories, ItemTypes, InstituteDepartments, DepartmentRooms
from . serializers import InfrastructureFormSerializer
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

        no_of_items = request.data.get('numberOfUnits')

        institute = request.data.get('institute')
        department = request.data.get('department')
        room_category = request.data.get('room_category')
        room_number = request.data.get('room_number')
        item_type = request.data.get('item_type')
        status = request.data.get('status')
        flag = True
        for i in range(int(no_of_items)):
            item_id = generate_item_id(institute, department, item_type, room_category, room_number)
            data = request.data
            data['item_id'] = item_id
            infrastructure_serializer = InfrastructureFormSerializer(data=data)
            if infrastructure_serializer.is_valid():
                infrastructure_serializer.save()
            else:
                return Response(infrastructure_serializer.errors)
        return Response({'message': 'Details Submitted Successfully'}, status=status.HTTP_200_OK)
                

# class InfrastructureCategoriesView(APIView):

#     def get(self, request):
#         queryset = InfrastructureCategories.objects.all()
#         # category_serializer = InfrastructureCategoriesSerializer(queryset, many=True)

#         institute = []
#         department = []
#         room_category = []
#         item_type = []
#         for each_data in queryset:
#             if each_data.form_field == "institute":
#                 institute.append(each_data.dropdown_value)
#             elif each_data.form_field == "department":
#                 department.append(each_data.dropdown_value)
#             elif each_data.form_field == "room_category":
#                 room_category.append(each_data.dropdown_value)
#             elif each_data.form_field == "item_type":
#                 item_type.append(each_data.dropdown_value)

#         response = {
#             'institute': institute,
#             'department': department,
#             'room_category': room_category,
#             'item_type' : item_type,
#         }
#         return Response(response, status=status.HTTP_200_OK)
#         # return Response(category_serializer.data, status=status.HTTP_200_OK)

class DropdownValuesView(APIView):

    def get(self, request):

        response = {
            "institute": [],
            "department": [],
            "rooms": [],
            "room_category": [],
            "item_type": [],
            "institute-departments": {}, 
            "departments-rooms": {}     
        }

        # Fetch data for Institutes
        institutes = Institutes.objects.all()
        institute_list = [institute.institute for institute in institutes]
        response['institute'] = institute_list

        # Fetch data for Departments
        departments = Departments.objects.all()
        department_list = [department.department for department in departments]
        response['department'] = department_list

        # Fetch data for Rooms
        rooms = Rooms.objects.all()
        room_list = [room.room_number for room in rooms]
        response['rooms'] = room_list

        # Fetch data for RoomCategories
        room_categories = RoomCategories.objects.all()
        category_list = [category.room_category for category in room_categories]
        response['room_category'] = category_list

        # Fetch data for ItemTypes
        item_types = ItemTypes.objects.all()
        item_type_list = [item.item_type for item in item_types]
        response['item_type'] = item_type_list

        # Fetch data for InstituteDepartments
        institute_departments = InstituteDepartments.objects.all()
        for inst_dept in institute_departments:
            institute_name = inst_dept.institute.institute.lower()
            department_name = inst_dept.department.department.lower()
            if institute_name in response["institute-departments"]:
                response["institute-departments"][institute_name].append(department_name)
            else:
                response["institute-departments"][institute_name] = [department_name]

        # Fetch data for DepartmentRooms
        department_rooms = DepartmentRooms.objects.all()
        for dept_room in department_rooms:
            department_name = dept_room.department.department.lower()
            room_number = dept_room.room_number.room_number
            if department_name in response["departments-rooms"]:
                response["departments-rooms"][department_name].append(room_number)
            else:
                response["departments-rooms"][department_name] = [room_number]

        return Response(response, status=status.HTTP_200_OK)

            

        