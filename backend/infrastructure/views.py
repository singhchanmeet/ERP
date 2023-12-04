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

        institute = request.data.get('institute').upper()
        department = request.data.get('department').upper()
        room_category = request.data.get('room_category').upper()
        room_number = request.data.get('room_number')
        item_type = request.data.get('item_type').upper()
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
            "room_number": [],
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
        response['room_number'] = room_list

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
            institute_name = inst_dept.institute.institute.upper()
            department_name = inst_dept.department.department.upper()
            if institute_name in response["institute-departments"]:
                response["institute-departments"][institute_name].append(department_name)
            else:
                response["institute-departments"][institute_name] = [department_name]

        # Fetch data for DepartmentRooms
        department_rooms = DepartmentRooms.objects.all()
        for dept_room in department_rooms:
            department_name = dept_room.department.department.upper()
            room_number = dept_room.room_number.room_number
            if department_name in response["departments-rooms"]:
                response["departments-rooms"][department_name].append(room_number)
            else:
                response["departments-rooms"][department_name] = [room_number]

        return Response(response, status=status.HTTP_200_OK)

            

# import pandas as pd
# from rest_framework.parsers import FileUploadParser


# class ExcelUploadView(APIView):
#     parser_classes = (FileUploadParser,)

#     def post(self, request, *args, **kwargs):

#         file = request.data['excel_file']  

#         # Check if the uploaded file is in Excel format
#         if not file.name.endswith('.xlsx'):
#             return Response({'error': 'Please upload a valid Excel file'}, status=400)

#         try:
#             # Read the Excel file using pandas
#             df = pd.read_excel(file)

#             # Loop through each row in the Excel file
#             for index, row in df.iterrows():
#                 institute = row['institute']
#                 department = row['department']
#                 room_category = row['room_category']
#                 room_number = row['room_number']
#                 item_type = row['item_type']
#                 year_of_purchase = row['year_of_purchase']
#                 no_of_items = row['no_of_items']

#                 # Generate item_id and save the data to the database
#                 for i in range(no_of_items):
#                     item_id = generate_item_id(institute, department, item_type, room_category, room_number)
#                     infrastructure_data = {
#                         'item_id': item_id,
#                         'institute': institute,
#                         'department': department,
#                         'room_category': room_category,
#                         'room_number': room_number,
#                         'item_type': item_type,
#                         'year_of_purchase': year_of_purchase if not pd.isnull(year_of_purchase) else None,
#                     }
#                     infrastructure_serializer = InfrastructureFormSerializer(data=infrastructure_data)
#                     if infrastructure_serializer.is_valid():
#                         infrastructure_serializer.save()
#                     else:
#                         return Response(infrastructure_serializer.errors, status=400)

#             return Response({'message': 'Data from Excel file has been successfully added to the database'}, status=200)

#         except Exception as e:
#             return Response({'error': str(e)}, status=400)


class InfrastructureAllRecords(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):

        all_records = InfrastructureForm.objects.all()
        serializer = InfrastructureFormSerializer(all_records, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)