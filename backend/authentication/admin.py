from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . models import User
from django.contrib.auth.models import Group

from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError


"""
Note for future devs (if any):
Even I don't know whats happening in this admin panel, 
all the code is copy pasted from this documentation:
https://docs.djangoproject.com/en/4.2/topics/auth/customizing/#a-full-example
"""

class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    disabled password hash display field.
    """
    # password = ReadOnlyPasswordHashField()
    # uncomment above line if you don't want to display even the hashed password 
    # currently it is commented because we want to allow the admin to update password

    class Meta:
        model = User
        fields = ('user_id', 'name', 'role', 'email', 'last_login', 'is_superuser', 'groups', 'user_permissions', 'is_staff', 'is_active', 'date_joined', 'is_teams_user', 'password')

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the fields
    on the user, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('user_id', 'name', 'role', 'email', 'last_login', 'is_superuser', 'groups', 'user_permissions', 'is_staff', 'is_active', 'date_joined', 'is_teams_user', 'password')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

class CustomUserAdmin(UserAdmin):

    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ['user_id', 'name', 'role']
    ordering = ['user_id']

    fieldsets = (
        (None, {'fields': ('user_id', 'name', 'role', 'email', 'last_login', 'is_superuser', 'groups', 'user_permissions', 'is_staff', 'is_active', 'date_joined', 'is_teams_user', 'password')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('user_id', 'name', 'role', 'email', 'last_login', 'is_superuser', 'groups', 'user_permissions', 'is_staff', 'is_active', 'date_joined', 'is_teams_user', 'password1', 'password2'),
        }),
    )


admin.site.register(User, CustomUserAdmin)

# admin.site.unregister(Group)


admin.site.site_header = "MAIT - ERP"
admin.site.index_title = "MAIT - ERP"
admin.site.site_title = "Admin"