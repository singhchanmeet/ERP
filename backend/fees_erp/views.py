from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from student.permissions import IsStudent
from . models import Fees, BilldeskOrders, BilldeskTransactions
from student.models import Student

from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

import requests
import json
from pathlib import Path
# import jwt
from jose import jws, jwt

from .utils import generate_order_id, generate_trace_id, get_client_ip

import time
from django.utils import timezone

import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env() 

# to display fees for the batch associated with the logged in user
class FeesDisplay(APIView):
    
    permission_classes = (IsAuthenticated, IsStudent)
    
    def get(self, request):
        
        logged_in_user = request.user
        logged_in_student = Student.objects.filter(student_id=logged_in_user).first()
        batch = logged_in_student.batch
        fees = Fees.objects.filter(batch=batch).first()
        
        response = {}
        
        
        if fees:

            if fees.display_tution_fee:
                response['Tution Fee'] = float(fees.tution_fee)
            if fees.display_activity_fee:
                response['Activity Fee'] = float(fees.activity_fee)
            if fees.display_university_fee:
                response['University Fee'] = float(fees.university_fee)
            if fees.display_security_fee:
                response['Security Fee'] = float(fees.security_fee)
            if fees.display_college_magazine:
                response['College Magazine'] = float(fees.college_magazine)
            if fees.display_rechecking_fee:
                response['Rechecking Fee'] = float(fees.rechecking_fee)
            if fees.display_reappear_fee:
                response['Reappear Fee'] = float(fees.reappear_fee)
            if fees.display_fine:
                response['Fine'] = float(fees.fine)
            if fees.display_institute_alumni_contribution:
                response['Institute Alumni Contribution'] = float(fees.institute_alumni_contribution)
            if fees.display_book_bank:
                response['Book Bank'] = float(fees.book_bank)
            # response['total_fee'] = float(fees.total_fee)
            
            return Response(response, status=status.HTTP_200_OK)
        
        else:
            return Response({'error': 'fees for batch not found'}, status=status.HTTP_204_NO_CONTENT)
        
@api_view(['POST'])
def create_billdesk_order(request):
    
    if request.method == 'POST':
        
        total_amount = request.data.get('total_amount')
        enrollment_no = request.user.user_id
                
        current_datetime_utc = timezone.now()
        # Convert the datetime to IST
        current_datetime_ist = current_datetime_utc.astimezone(timezone.get_current_timezone())
        formatted_datetime = current_datetime_ist.strftime('%Y-%m-%dT%H:%M:%S+05:30')
        
        try:
            
            json_file_path = Path(__file__).resolve().parent / 'create_order.json'
            json_file_content = json_file_path.read_text()
            json_data = json.loads(json_file_content)

            # Use the json_data as needed in your view logic
            json_data['orderid'] = generate_order_id(enrollment_no)
            json_data['amount'] = total_amount
            json_data['order_date'] = formatted_datetime
            json_data['device']['ip'] = get_client_ip(request)
            json_data['device']['user_agent'] = request.META.get('HTTP_USER_AGENT', '')
            
            current_timestamp = int(time.time())
            
            post_url = env('CREATE_ORDER_URL')
            
            headers = {
                "Content-Type": "application/jose",
                "Accept": "application/jose",
                "BD-Traceid": f"{generate_trace_id()}",
                "BD-Timestamp": f"{str(current_timestamp)}"
            }
            
            # JWS Header fields
            jws_header = {
                "alg": f"{env('ALG')}",
                "clientid": f"{env('CLIENT_ID')}"
            }
            
            token = jwt.encode(json_data, env('BD_SECRET_KEY'), algorithm=env('ALG'), headers=jws_header )
            
            # Make the POST request
            response = requests.post(post_url, data=token, headers=headers)
            
            print(token)

            # # Return the entire content as a JSON response
            # json_response = {
            #     'key' : env('BD_SECRET_KEY'),
            #     'status_code': response.status_code,
            #     'request_url': response.request.url,
            #     'request_method': response.request.method,
            #     'request_headers': dict(response.request.headers),
            #     'request_body': response.request.body.decode('utf-8') if isinstance(response.request.body, bytes) else response.request.body,
            #     'response_headers': dict(response.headers),
            #     'response_content': response.text
            # }
            # Return a JsonResponse with the information
            # return JsonResponse(json_response, json_dumps_params={'indent': 2})
            if response.status_code == 200:
            
                decoded_response = jwt.decode(response.text, key=env('BD_SECRET_KEY'), algorithms=[env('ALG')])
                
                new_order = BilldeskOrders.objects.create(order_id=json_data['orderid'], order_amount=total_amount,
                                                          bd_order_id=decoded_response.get('bdorderid', ''), 
                                                          order_response=decoded_response)
                
                new_order.save()
                
                context = {"merchantId" : env('MERCHANT_ID'),
                            "bdOrderId" : decoded_response.get('bdorderid', ''),
                            "authToken" : decoded_response['links'][1]['headers']['authorization']
                        }
                
                # return render(request, 'fees/transaction.html', context)
                return Response(context, status=status.HTTP_200_OK)
            
            else:
                return Response(response.text)
            
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
