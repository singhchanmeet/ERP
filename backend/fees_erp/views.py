from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from authentication. permissions import accounts_department
from student.permissions import IsStudent
from . models import Fees, SplitPayment, StudentFees, BilldeskOrders, BilldeskTransactions
from . serializers import SplitPaymentSerializer, StudentFeesSerializer,FeesSerializer,billdeskorderSerializer,billdesktransactionSerializer
from student.models import Student
from authentication.models import User
from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.template import loader

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



# view for the whole request panel for paying in parts
class SplitPaymentView(APIView):
    
    permission_classes = (IsAuthenticated, )
    
    def post(self, request) :
        
        # appending the student to request data for saving
        request.data._mutable = True
        request.data['student'] = request.user.pk
        request.data._mutable = False
        
        serializer = SplitPaymentSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response ({'message': 'Record created successfully'}, status=status.HTTP_201_CREATED)
        
        else: 
            return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
    def get(self, request):

        student = request.user
        student = SplitPayment.objects.filter(student=student).first()

        if student:
            serializer = SplitPaymentSerializer(student)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Student details not found'}, status=status.HTTP_204_NO_CONTENT)


# to create billdesk orders
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




# billdesk order callback, after successful payment
@csrf_exempt
def billdesk_order_callback(request):
    
    decoded_response = jwt.decode(request.POST.get('transaction_response'), key=env('BD_SECRET_KEY'), algorithms=[env('ALG')])
    
    new_transaction = BilldeskTransactions.objects.create(order_id=decoded_response.get('orderid', ''), transaction_id=decoded_response.get('transactionid', ''),
                            transaction_amount=decoded_response.get('amount', ''), transaction_status=decoded_response.get('transaction_error_type', ''),
                            payment_method=decoded_response.get('payment_method_type', ''), transaction_response=decoded_response)
    
    new_transaction.save()
    
    
    # saving final student fee record if the transaction is successful
    if (decoded_response.get('transaction_error_type', '') == 'success'):
        
        enrollment_number =  decoded_response.get('orderid', '')[:11]
        user = User.objects.get(user_id=enrollment_number)
        student = Student.objects.get(student_id=user)
        batch = student.batch
        branch = student.branch
        group = student.group
        
        new_fee = StudentFees.objects.create(student=user, enrollment_number=enrollment_number,
                                             batch=batch, group=group, branch=branch, order_id=decoded_response.get('orderid', ''),
                                             transaction_id=decoded_response.get('transactionid', ''),
                                            transaction_amount=decoded_response.get('amount', ''), 
                                            transaction_status=decoded_response.get('transaction_error_type', ''),
                                            payment_method=decoded_response.get('payment_method_type', ''))
        
        new_fee.save()       
    
    
    
    
    context = {
        "TransactionID " : decoded_response.get('transactionid', ''),
        "OrderID" : decoded_response.get('orderid', ''),
        "TransactionStatus" : decoded_response.get('transaction_error_type', '').upper(),
        "TransactionTime" : decoded_response.get('transaction_date', ''),
        "TransactionAmount" : decoded_response.get('amount', ''),
        "PaymentMethod" : decoded_response.get('payment_method_type', '')
    }

    return render(request, 'fees_erp/bill.html', context)



class StudentFeesView(APIView):
    
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        
        user = request.user
        fees = StudentFees.objects.filter(student = request.user)
        
        data = []
        
        for fee in fees:

            serializer = StudentFeesSerializer(fee)
            data.append(serializer.data)

        return Response(data, status=status.HTTP_200_OK)
    
       
       
class FeesPaid(APIView) :
    
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        
        user = request.user
        
        is_split_payment = SplitPayment.objects.filter(student=user)
        
        if len(is_split_payment) == 1:
            
            has_paid_full = StudentFees.objects.filter(student=user)
            
            # applied for split payment and paid full
            if len(has_paid_full) >= 2:
                return Response({'split':True,'paid':True}, status=status.HTTP_200_OK)
            # applied for split payment and paid half
            elif len(has_paid_full) == 1:
                return Response({'split':True,'paid':'half'}, status=status.HTTP_200_OK)
            # applied for split payment and not paid at all
            else:
                return Response({'split':True,'paid':False}, status=status.HTTP_200_OK)
        else :
            
            has_paid_full = StudentFees.objects.filter(student=user)
            
            # not applied for split and paid full
            if len(has_paid_full) >= 1:
                return Response({'split':False,'paid':True}, status=status.HTTP_200_OK)
            # not applied for split and paid full
            else:
                return Response({'split':False,'paid':False}, status=status.HTTP_200_OK)
            
            
class feesAdminPanel(viewsets.ModelViewSet):
    queryset=Fees.objects.all()
    serializer_class=FeesSerializer
    permission_classes = [IsAuthenticated,accounts_department]
    
class studentFeesAdminPanel(viewsets.ModelViewSet):
    queryset=StudentFees.objects.all()
    serializer_class=StudentFeesSerializer
    permission_classes = [IsAuthenticated,accounts_department]
    
class splitpayment(viewsets.ModelViewSet):
    queryset=SplitPayment.objects.all()
    serializer_class=SplitPaymentSerializer
    permission_classes = (IsAuthenticated,accounts_department,)
        
class BilldeskOrdersFunc(viewsets.ReadOnlyModelViewSet):
  queryset=BilldeskOrders.objects.all()
  serializer_class=billdeskorderSerializer
  permission_classes = [IsAuthenticated,accounts_department]
    
class BilldeskTransactionsFunc(viewsets.ReadOnlyModelViewSet):
    queryset=BilldeskTransactions.objects.all()
    serializer_class=billdesktransactionSerializer
    permission_classes = [IsAuthenticated,accounts_department]
    
