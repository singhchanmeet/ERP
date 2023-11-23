from rest_framework.permissions import BasePermission


# Custom permission to only allow access to students.
    
class IsEmployee(BasePermission):

    def has_permission(self, request, view):
        # If user exists and their role is 'EMPLOYEE' then return True, otherwise return False
        return request.user and request.user.role == 'EMPLOYEE'
