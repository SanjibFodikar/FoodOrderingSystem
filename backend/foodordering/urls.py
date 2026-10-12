from django.urls import path
from . import views

urlpatterns = [
    path('admin_login_api/',views.admin_login_api),
    path('add_category/',views.add_category),
    path('category_list/',views.category_list),
    path('add_food_item/',views.add_food_item),
    path('Foods_list/',views.Foods_list),
    path('Foods_search/',views.Foods_search),
    path('Foods_random/',views.Foods_random),
    path('userRegister/',views.userRegister),
    path('userLogin/',views.userLogin),
    path('food_detail/<int:id>/',views.food_detail),
    path('cart_add/',views.cart_add),
    path('all_cart/<int:id>/',views.all_cart),
    path('cart_update_quantity/',views.update_quantity),
    path('cart_delete/<int:id>/',views.cart_delete),
    path('place_order/',views.place_order),
    path('my_orders/<int:userId>/',views.my_orders),
    path('orders/order_number/<str:order_number>/',views.order_by_order_number),
    path('orders/order_address/<str:order_number>/',views.order_address),
    path('invoice/<str:order_number>/',views.generate_invoice),
    path('userDetails/<int:userId>/',views.FetchuserDetails),
    path('user_update/<int:userId>/',views.user_update),
    path('change_password/',views.change_password)
]
