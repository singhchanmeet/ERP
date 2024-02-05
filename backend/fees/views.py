from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from . models import Fees

import requests
import json
from pathlib import Path
# import jwt
from jose import jws, jwt

from .utils import generate_order_id, generate_trace_id

import time
from django.utils import timezone

import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env() 

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


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
            json_data['device']['ip'] = "192.168.125.223"
            json_data['device']['user_agent'] = request.META.get('HTTP_USER_AGENT', '')
            
            current_timestamp = int(time.time())
            
            post_url = env('CREATE_ORDER_URL')
            
            headers = {
                "Content-Type": "application/jose",
                "Accept": "application/jose",
                "BD-Traceid": f"{generate_trace_id()}",
                "BD-Timestamp": f"{str(current_timestamp)}",
            }
            
            # JWS Header fields
            jws_header = {
                "alg": f"{env('ALG')}",
                "clientid": f"{env('CLIENT_ID')}",
            }
            
            # json_data = {
            #     "mercid": "UATMATESV2",
            #     "orderid": "01KLDSDFD22",
            #     "amount": "500.00",
            #     "order_date": "2024-02-05T11:23:36+05:30",
            #     "currency": "356",
            #     "ru": "https://admin.erp.mait.ac.in/fee/s2sresp/",
            #     "itemcode": "DIRECT",
            #     "device": {
            #         "init_channel": "internet",
            #         "ip": "202.149.208.92",
            #         "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            #         "accept_header": "text/html",
            #         "fingerprintid": "61b12c18b5d0cf901be34a23ca64bb19",
            #         "browser_tz": "-330",
            #         "browser_color_depth": "32",
            #         "browser_java_enabled": "false",
            #         "browser_screen_height": "601",
            #         "browser_screen_width": "657",
            #         "browser_language": "en-US",
            #         "browser_javascript_enabled": "true"
            #     }
            # }
            
            # jws_header = {
            #     "alg": "HS256",
            #     "clientid": "uatmatesv2"
            # }
            
            # Create a JWS-HMAC token with the JSON data and JWS header
            # encrypted_token = jws.sign(
            #     payload=json_data,
            #     key=env('SECRET_KEY'),
            #     algorithm=env('ALG'),
            #     headers=jws_header,
            # )
            token = jwt.encode(json_data, f"{env('SECRET_KEY')}", algorithm="HS256", headers=jws_header )
            # encrypted_token = jwt.encode(
            #     payload=json_data,
            #     key=env('SECRET_KEY'),
            #     algorithm=env('ALG'),
            #     headers=jws_header,
            # )
            
            # Include the encrypted token in the request header
            # headers['Authorization'] = f'Bearer {encrypted_token}'
            
            # token_bytes = encrypted_token.encode('utf-8')
            
            # encrypted_token="eyJhbGciOiJIUzI1NiIsImNsaWVudGlkIjoidWF0bWF0ZXN2MiJ9.eyJtZXJjaWQiOiJVQVRNQVRFU1YyIiwib3JkZXJpZCI6IjAxS0xEU0RGRDIyIiwiYW1vdW50IjoiNTAwLjAwIiwib3JkZXJfZGF0ZSI6IjIwMjQtMDItMDVUMTE6MjM6MzYrMDU6MzAiLCJjdXJyZW5jeSI6IjM1NiIsInJ1IjoiaHR0cHM6Ly9hZG1pbi5lcnAubWFpdC5hYy5pbi9mZWUvczJzcmVzcC8iLCJpdGVtY29kZSI6IkRJUkVDVCIsImRldmljZSI6eyJpbml0X2NoYW5uZWwiOiJpbnRlcm5ldCIsImlwIjoiMjAyLjE0OS4yMDguOTIiLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMS4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYWNjZXB0X2hlYWRlciI6InRleHQvaHRtbCIsImZpbmdlcnByaW50aWQiOiI2MWIxMmMxOGI1ZDBjZjkwMWJlMzRhMjNjYTY0YmIxOSIsImJyb3dzZXJfdHoiOiItMzMwIiwiYnJvd3Nlcl9jb2xvcl9kZXB0aCI6IjMyIiwiYnJvd3Nlcl9qYXZhX2VuYWJsZWQiOiJmYWxzZSIsImJyb3dzZXJfc2NyZWVuX2hlaWdodCI6IjYwMSIsImJyb3dzZXJfc2NyZWVuX3dpZHRoIjoiNjU3IiwiYnJvd3Nlcl9sYW5ndWFnZSI6ImVuLVVTIiwiYnJvd3Nlcl9qYXZhc2NyaXB0X2VuYWJsZWQiOiJ0cnVlIn19.M7Hd5N4iw5-j1V_jk2XrbscLUTusNAfztZiPIaTCCqU"
            # Make the POST request
            response = requests.post(post_url, data=token, headers=headers)
            print(token)
            print(response._content)
            
            # # return it as a JsonResponse
            # return JsonResponse(response._content)
            
            # Assuming response._content is a bytes object
            content_str = response._content.decode('utf-8')
            data = json.loads(content_str)

            # Return the entire content as a JSON response
            # return JsonResponse(data)
            json_response = {
                'key' : f"{env('SECRET_KEY')}",
                'status_code': response.status_code,
                'request_url': response.request.url,
                'request_method': response.request.method,
                'request_headers': dict(response.request.headers),
                'request_body': response.request.body.decode('utf-8') if isinstance(response.request.body, bytes) else response.request.body,
                'response_headers': dict(response.headers),
                'response_content': response.text
            }

            # Return a JsonResponse with the information
            return JsonResponse(json_response, json_dumps_params={'indent': 2})
        
        except FileNotFoundError:
            return JsonResponse({'status': 'error', 'message': 'File not found'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})


def billdesk_order_callback(request):
    if request.METHOD == 'POST':
        print (request.data)
        return HttpResponse('ok')