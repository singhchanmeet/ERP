from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from student.permissions import IsStudent
from student.models import Student
from . models import Fees

class FeesDisplayView(APIView):

    permission_classes=(IsAuthenticated, IsStudent)

    def get(self, request):

        logged_in_student = Student.objects.filter(student_id=request.user).first()
        batch = logged_in_student.batch

        fees = Fees.objects.filter(batch=batch).first()
        response = {}

        if fees.display_tution_fee:
            response['tution_fee'] = fees.tution_fee
        if fees.display_activity_fee:
            response['activity_fee'] = fees.activity_fee
        if fees.display_university_fee:
            response['university_fee'] = fees.university_fee
        if fees.display_security_fee:
            response['security_fee'] = fees.security_fee
        if fees.display_college_magazine:
            response['college_magazine'] = fees.college_magazine
        if fees.display_rechecking_fee:
            response['rechecking_fee'] = fees.rechecking_fee
        if fees.display_reappear_fee:
            response['reappear_fee'] = fees.reappear_fee
        if fees.display_fine:
            response['fine'] = fees.fine
        if fees.display_institute_alumni_contribution:
            response['institute_alumni_contribution'] = fees.institute_alumni_contribution
        if fees.display_book_bank:
            response['book_bank'] = fees.book_bank
        response['total_fee'] = fees.total_fee

        return Response(response, status=status.HTTP_200_OK)
