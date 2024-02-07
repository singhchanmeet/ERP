from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from . models import Fees, BilldeskOrders, BilldeskTransactions

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

def fees_login(request):
    
    if request.method == 'POST':
        batch = request.POST.get('batch')
        return redirect('fees_display', batch)
        
    # GET REQUEST
    return render(request, 'fees/fees_login.html')


def fees_display(request, batch):
    fees = Fees.objects.filter(batch=batch).first()
    fees_context = {}

    if fees:

        if fees.display_tution_fee:
            fees_context['Tution Fee'] = float(fees.tution_fee)
        if fees.display_activity_fee:
            fees_context['Activity Fee'] = float(fees.activity_fee)
        if fees.display_university_fee:
            fees_context['University Fee'] = float(fees.university_fee)
        if fees.display_security_fee:
            fees_context['Security Fee'] = float(fees.security_fee)
        if fees.display_college_magazine:
            fees_context['College Magazine'] = float(fees.college_magazine)
        if fees.display_rechecking_fee:
            fees_context['Rechecking Fee'] = float(fees.rechecking_fee)
        if fees.display_reappear_fee:
            fees_context['Reappear Fee'] = float(fees.reappear_fee)
        if fees.display_fine:
            fees_context['Fine'] = float(fees.fine)
        if fees.display_institute_alumni_contribution:
            fees_context['Institute Alumni Contribution'] = float(fees.institute_alumni_contribution)
        if fees.display_book_bank:
            fees_context['Book Bank'] = float(fees.book_bank)
        # fees_context['total_fee'] = float(fees.total_fee)

        context = {'fees' : fees_context}

        return render(request, 'fees/fees_display.html', context)
    
    else:
        return HttpResponse('Resource Not Found')
  
   
def create_billdesk_order(request):
    
    if request.method == 'POST':
        
        total_amount = request.POST.get('total_amount')
        enrollment_no = request.POST.get('enrollment_no')
                
        current_datetime_utc = timezone.now()
        # Convert the datetime to IST
        current_datetime_ist = current_datetime_utc.astimezone(timezone.get_current_timezone())
        formatted_datetime = current_datetime_ist.strftime('%Y-%m-%dT%H:%M:%S+05:30')
        
        try:
            
            json_file_path = Path(__file__).resolve().parent / 'create_order.json'
            json_file_content = json_file_path.read_text()
            json_data = json.loads(json_file_content)

            # Use the json_data as needed in your view logic
            # json_data['orderid'] = generate_order_id()
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
                
                new_order = BilldeskOrders.objects.create(order_id=json_data['orderid'], 
                                                          bd_order_id=decoded_response.get('bdorderid', ''), 
                                                          order_response=decoded_response)
                
                new_order.save()
                
                context = {"merchantId" : env('MERCHANT_ID'),
                            "bdOrderId" : decoded_response.get('bdorderid', ''),
                            "authToken" : decoded_response['links'][1]['headers']['authorization']
                        }
                
                return render(request, 'fees/transaction.html', context)
            
            else:
                return HttpResponse(response.text)
            
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

@csrf_exempt
def billdesk_order_callback(request):
    
    decoded_response = jwt.decode(request.POST.get('transaction_response'), key=env('BD_SECRET_KEY'), algorithms=[env('ALG')])
    
    new_transaction = BilldeskTransactions.objects.create(order_id=decoded_response.get('orderid', ''),
                            transaction_id=decoded_response.get('transactionid', ''), transaction_status=decoded_response.get('transaction_error_type', ''),
                            payment_method=decoded_response.get('payment_method_type', ''), transaction_response=decoded_response)
    
    new_transaction.save()
    
    response = {
        "Transaction ID " : decoded_response.get('transactionid', ''),
        "Order ID" : decoded_response.get('orderid', ''),
        "Transaction Status" : decoded_response.get('transaction_error_type', '').toupper(),
        "Transaction Time" : decoded_response.get('transaction_date', '')
    }

    return JsonResponse(response)