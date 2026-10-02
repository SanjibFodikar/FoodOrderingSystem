from django.urls import path
from . import views

urlpatterns = [
    path('admin_login_api/',views.admin_login_api),
    path('add_category/',views.add_category),
    path('category_list/',views.category_list),
    path('add_food_item/',views.add_food_item),
    path('Foods_list/',views.Foods_list),
    path('Foods_search/',views.Foods_search),
    path('Foods_random/',views.Foods_random)
]
