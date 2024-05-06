from rest_framework.permissions import BasePermission


class IsAccount(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method == 'GET':
            return True  # Allow GET requests for all users

        if user.is_authenticated and hasattr(user, 'role') and user.role == 'ACCOUNT':
            return True  # Allow PUT, POST, DELETE requests for authenticated placement officers
        
        return False    