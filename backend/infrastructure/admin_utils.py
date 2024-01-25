import pandas as pd
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import InfrastructureForm, Rooms
from .serializers import InfrastructureFormSerializer

from django.contrib import admin
from django.contrib import messages
from django.shortcuts import render, redirect

def generate_item_id(ins, dept, item_type, categ, roomno):

    existing_items = len(InfrastructureForm.objects.filter(institute=ins, department=dept, item_type=item_type))

    id = f'{ins}/{dept}/{categ}/{roomno}/{item_type}/{existing_items+1}'
    return id


class ExcelUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        file = request.data['excel_file']  

        # Check if the uploaded file is in Excel format
        if not file.name.endswith('.xlsx'):
            return Response({'error': 'Please upload a valid Excel file'}, status=400)

        try:
            # Read the Excel file using pandas
            df = pd.read_excel(file)

            # Loop through each row in the Excel file
            for index, row in df.iterrows():
                institute = row['institute'].upper()
                department = row['department'].upper()
                room_category = row['room_category'].upper()
                room_number = row['room_number']
                item_type = row['item_type'].upper()
                year_of_purchase = row['year_of_purchase']
                no_of_items = row['no_of_items']

                # Generate item_id and save the data to the database
                for i in range(no_of_items):
                    item_id = generate_item_id(institute, department, item_type, room_category, room_number)
                    infrastructure_data = {
                        'item_id': item_id,
                        'institute': institute,
                        'department': department,
                        'room_category': room_category,
                        'room_number': room_number,
                        'item_type': item_type,
                        'year_of_purchase': year_of_purchase if not pd.isnull(year_of_purchase) else None,
                    }
                    infrastructure_serializer = InfrastructureFormSerializer(data=infrastructure_data)
                    if infrastructure_serializer.is_valid():
                        infrastructure_serializer.save()
                    else:
                        return Response(infrastructure_serializer.errors, status=400)

            return Response({'message': 'Data from Excel file has been successfully added to the database'}, status=200)

        except Exception as e:
            return Response({'error': str(e)}, status=400)


@admin.action(description='Generate PDF file')
def generatePDF(modeladmin, request, queryset):
    all_ids = []  # storing ids from the queryset in a list
    for query in queryset:
        all_ids.append(query.id)
    all_records = InfrastructureForm.objects.filter(pk__in = all_ids) #pk is primary key
    context = {'all_records' : all_records}
    return render(request,'infrastructure/pdfs-infra.html', context)

def bulk_rooms_add(request):

    block = request.POST.get('block')
    floor = request.POST.get('floor')
    no_of_rooms = request.POST.get('no_of_rooms')

    for i in range(int(no_of_rooms)):
        room_no = f'{block}{floor}{i+1}'
        Rooms.objects.create(room_number=room_no)
    
    messages.add_message(request, messages.INFO, f'{no_of_rooms} rooms added successfully.')
    return redirect('/admin/infrastructure/rooms/')