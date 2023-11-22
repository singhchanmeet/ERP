# This file contains utility functions
# (rename functions for file upload)
# we are renaming everything by employee_id because that is unique for every candidate
import os

# Passport Photograph rename
def passport_photograph_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.employee_id, ext)
        # If we change a already uploaded file or image from admin panel
        # then to avoid naming conflict, we first remove the already uploaded file 
        for each_file in os.listdir(os.path.join('media/employee/photographs')):
            if (each_file == new_name):
                os.remove(os.path.join('media/employee/photographs', new_name))
        return os.path.join('employee/photographs', new_name)
    else:
        return filename
    
    
# Aadhar card rename
def aadhar_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.employee_id, ext)
        # If we change a already uploaded file or image from admin panel
        # then to avoid naming conflict, we first remove the already uploaded file
        for each_file in os.listdir(os.path.join('media/employee/aadhar')):
            if (each_file == new_name):
                os.remove(os.path.join('media/employee/aadhar', new_name))
        return os.path.join('employee/aadhar', new_name)
    else:
        return filename

# Pan card rename
def pancard_rename(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        new_name = '{}.{}'.format(instance.employee_id, ext)
        # If we change a already uploaded file or image from admin panel
        # then to avoid naming conflict, we first remove the already uploaded file 
        for each_file in os.listdir(os.path.join('media/employee/pancard')):
            if (each_file == new_name):
                os.remove(os.path.join('media/employee/pancard', new_name))
        return os.path.join('employee/pancard', new_name)
    else:
        return filename
    
