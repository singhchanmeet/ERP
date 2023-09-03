from . import user_model
from . import student_model
from . import employee_model

# As we have changed the default folder structure , so to tell Django that this folder is a package in our AuthPortal app.,
# we need to create an __init__ file

# also the __init__.py file contains initialization script for a package,
#  that is why we have done some imports because in settings we have declared AUTH_USER_MODEL 
# so we initialize this package with imports that can be used in settings at the start of project