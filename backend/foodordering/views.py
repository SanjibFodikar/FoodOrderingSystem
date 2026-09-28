from django.shortcuts import render
from .models import *
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
def admin_login_api(request):
    username=request.data.get('Username')
    password=request.data.get('Password')
    user=authenticate(username=username,password=password)
    if user and user.is_staff:
        return Response({
            'message':'login successfully',
            'username':username
            },status=200)
    return Response({
        'message':'user not found ! try again'
    },status=400)

@api_view(['POST'])
def add_category(request):
    try:
        category=request.data
        Category.objects.create(
            category_name=category
        )
        return Response({
            'message':'Category Created Successfully'
        },status=201)
    except Exception as e:
        return Response({
            'message':'Something Went Wrong ! Please Try Again'
        },status=401)

    