from django.urls import path
from . import views

urlpatterns = [
    path('admin_login_api/',views.admin_login_api),
    path('add_category/',views.add_category)
]
