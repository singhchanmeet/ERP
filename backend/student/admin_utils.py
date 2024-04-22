# This file contains admin panel utility functions
# For example the view for alloting groups to students

from groups.models import StudentGroups, Groups
from student.models import Student
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib import admin
from authentication.models import User
import ast


# This function will just render the HTML template and pass student ids as context to the template
@admin.action(description='Allot Group to selected Students')
def allot_group_to_students(self, request, queryset):
    all_student_ids = []
    for student in queryset:
        all_student_ids.append(student.student_id.user_id)
    return render(request, 'groups/allot-groups.html', {'all_student_ids': all_student_ids})


# This function will handle the post request sent by allot-groups.html file
def handle_group_allotment(request):

    all_student_ids = request.POST.get('all_student_ids')
    group_name = request.POST.get('group_name', None)

    group, created = Groups.objects.get_or_create(group_name=group_name)
    
    list_from_string = ast.literal_eval(all_student_ids)

    for student_id in list_from_string:
        student = User.objects.filter(user_id=student_id).first()
        StudentGroups.objects.create(
            group_name=group,
            student_id=student,
            student_name=student.name
        )
        student_object = Student.objects.get(student_id=student)
        student_object.group = group
        student_object.save()

    messages.add_message(request, messages.INFO, f'{len(list_from_string)} students were allotted the group {group_name}')
    return redirect('/admin/student/student/')