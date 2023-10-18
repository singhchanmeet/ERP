# This file contains utility functions
# (rename functions for file upload)
# we are renaming everything by enrollment_number because that is unique for every candidate
import os

# Passport Photograph rename
def passport_photograph_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.enrollment_number, ext)
        # If we change a already uploaded file or image from admin panel
        # then to avoid naming conflict, we first remove the already uploaded file 
        for each_file in os.listdir(os.path.join('media/student/photographs')):
            if (each_file == new_name):
                os.remove(os.path.join('media/student/photographs', new_name))
        return os.path.join('student/photographs', new_name)
    else:
        return filename
    
# 10th class marksheet rename 
def marksheet_10th_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.enrollment_number, ext)
        # If we change a already uploaded file or image from admin panel
        # then to avoid naming conflict, we first remove the already uploaded file
        for each_file in os.listdir(os.path.join('media/student/marksheet10th')):
            if (each_file == new_name):
                os.remove(os.path.join('media/student/marksheet10th', new_name))
        return os.path.join('student/marksheet10th', new_name)
    else:
        return filename    
    
# 12th class marksheet rename 
def marksheet_12th_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.enrollment_number, ext)
        # If we change a already uploaded file or image from admin panel
        # then to avoid naming conflict, we first remove the already uploaded file
        for each_file in os.listdir(os.path.join('media/student/marksheet12th')):
            if (each_file == new_name):
                os.remove(os.path.join('media/student/marksheet12th', new_name))
        return os.path.join('student/marksheet12th', new_name)
    else:
        return filename    
    
# Aadhar card rename
def aadhar_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.enrollment_number, ext)
        # If we change a already uploaded file or image from admin panel
        # then to avoid naming conflict, we first remove the already uploaded file
        for each_file in os.listdir(os.path.join('media/student/aadhar')):
            if (each_file == new_name):
                os.remove(os.path.join('media/student/aadhar', new_name))
        return os.path.join('student/aadhar', new_name)
    else:
        return filename

# Pan card rename
def pancard_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.enrollment_number, ext)
        # If we change a already uploaded file or image from admin panel
        # then to avoid naming conflict, we first remove the already uploaded file 
        for each_file in os.listdir(os.path.join('media/student/pancard')):
            if (each_file == new_name):
                os.remove(os.path.join('media/student/pancard', new_name))
        return os.path.join('student/pancard', new_name)
    else:
        return filename
    
