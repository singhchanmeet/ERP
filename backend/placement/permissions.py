from rest_framework.permissions import BasePermission , IsAuthenticated



class WriteByPlacement(BasePermission):
    def has_permission(self, request, view):
        user =request.user
        # print(request.user.role)
        if request.method =='GET':
            return True
        if request.method =='PUT' or request.method =='POST' or request.method =='DELETE':
            if user.role == 'PLACEMENTOFFICER':
                return True
        return False
        



