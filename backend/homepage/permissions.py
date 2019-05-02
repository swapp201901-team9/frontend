from rest_framework import permissions

class IsAuthenticatedOrPOSTOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET' or request.method == 'DELETE':
            return request.user.is_authenticated
        return request.method == 'POST'

class IsAuthenticatedOrGETOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return request.user.is_authenticated

class IsAuthenticatedOrNothing(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated
