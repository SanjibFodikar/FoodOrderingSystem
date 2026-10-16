from django.shortcuts import render
from .models import *
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth.hashers import make_password,check_password

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

@api_view(['GET'])
def category_list(request):
    categories=Category.objects.all()
    serializer=CategorySerializers(categories,many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_category(request,id):
    try:
      category=Category.objects.get(id=id)
      category.delete()
      return Response({'message':'deleted'},status=200)
    except Exception as e:
        print(e)

@api_view(['GET','PUT'])
def edit_category(request,id):
    category=get_object_or_404(Category,id=id)
    if request.method =='GET':
        serializer=CategorySerializers(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializers(category,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Category updated successfully'}, status=200)
        return Response(serializer.errors,status=400)

            

from rest_framework.parsers import MultiPartParser,FormParser

@api_view(['POST'])
@parser_classes([MultiPartParser,FormParser])
def add_food_item(request):
    serializer=FoodSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message':"Food Item Created Successfully"
        },status=201)

    print(serializer.errors)
    return Response({
        'message':"Something Went Wrong",
        'errors': serializer.errors
    },status=401)

@api_view(['DELETE'])
def delete_food(request,id):
    try:
      food=Food.objects.get(id=id)
      food.delete()
      return Response({'message':'deleted'},status=200)
    except Exception as e:
        return Response({'message':'somethig went wrong'},status=400)

@api_view(['GET'])
def get_food_items(request,id):
    food=Food.objects.select_related('category').get(id=id)
    serializer=FoodSerializers(food)
    return Response(serializer.data)

@api_view(['PUT'])
@parser_classes([MultiPartParser,FormParser])
def edit_food_item(request,id):
    food=Food.objects.select_related('category').get(id=id)
    print(request.data)
    serializer=FoodSerializers(food,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message':'Food Updated Successfully'
        },status=200)
    return Response({
        'message':'Something went wrong',
        'errors': serializer.errors
    },status=400)

@api_view(['GET'])
def Foods_list(request):
    foods=Food.objects.all()
    serializer=FoodSerializers(foods,many=True)
    print(serializer)
    return Response(serializer.data)

@api_view(['GET'])
def Foods_search(request):
    query=request.GET.get('q')
    foods=Food.objects.filter(item_name__icontains=query)
    serializer=FoodSerializers(foods,many=True)
    return Response(serializer.data)

import random
@api_view(['GET'])
def Foods_random(request):
    foods=list(Food.objects.all())
    random.shuffle(foods)
    random_food = foods[0:9]
    serializer=FoodSerializers(random_food,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def userRegister(request):
    name=request.data.get('name')
    email=request.data.get('email')
    mobile=request.data.get('password')
    password=request.data.get('password')
    if User.objects.filter(email=email).exists():
        return Response({
            'message':'This Email Already Exist , try with another'
        },status=401)
    if User.objects.filter(mobile=mobile).exists():
        return Response({
            'message':'This Mobile Number Already Exist , try with another'
        },status=401)

    User.objects.create(
        full_name=name,
        email=email,
        mobile=mobile,
        password=make_password(password)
    )
    return Response({
        'message':'Account Created Successfully'
    },status=201)

from django.db.models import Q
@api_view(['POST'])
def userLogin(request):
    identifier=request.data.get('emailcont')
    password=request.data.get('password')
    user = User.objects.get(Q(email=identifier) | Q(mobile=identifier))
    if user:
        if check_password(password,user.password):
            return Response({
                'userId':user.id,
                'username':user.full_name,
                'message':'Login Successfully'
            },status=200)
        else:
            return Response({
                'message':'Invalid Password'
            },status=400)
    else:
       return Response({'message':'Invalid Email Or Mobile'},status=400)

@api_view(['GET'])
def get_users(request):
    users=User.objects.all().order_by('-id')
    serializer=UserSerializers(users,many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_user(request,id):
    user=User.objects.get(id=id)
    user.delete()
    return Response({
        'message':'user deleted successfully'
    },status=200)

from django.shortcuts import get_object_or_404
@api_view(['GET'])
def food_detail(request,id):
    food=get_object_or_404(Food,id=id)
    serializer=FoodSerializers(food)
    return Response(serializer.data)

@api_view(['POST'])
def cart_add(request):
    userId=request.data.get('userId')
    foodId=request.data.get('foodId')
    order,created=Order.objects.get_or_create(
        user_id=userId,
        food_id=foodId,
        is_order_placed=False,
        defaults={'quantity':1}
    )
    if not created:
        order.quantity+=1
        order.save()
    return Response({
        'message':"Food added to cart successfully."
    },status=200)


@api_view(['GET'])
def all_cart(request,id):
    print(id)
    order=Order.objects.filter(user_id=id,is_order_placed=False).select_related('food')
    print(order)
    serializer=CartOrderSerializers(order,many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_quantity(request):
    orderId=request.data.get('orderId')
    newquantity=request.data.get('newQuantity')
    order=get_object_or_404(Order,id=orderId,is_order_placed=False)
    order.quantity=newquantity
    order.save()
    return Response({
        'message':"Quantity Updated Successfully"
    },status=200)

@api_view(['DELETE'])
def cart_delete(request,id):
    try:
       order=get_object_or_404(Order,id=id,is_order_placed=False)
       order.delete()
       return Response({
        'message':"Cart Items Deleted Successfully"
       },status=200)
    except Exception as e:
        return Response({
                'message':"Something went wrong"
               },status=400)

def make_unique_order_number():
    while True:
        num=str(random.randint(100000000,999999999))
        if not OrderAddress.objects.filter(order_number=num).exists():
            return num

@api_view(['PUT'])
def place_order(request):
    userId=request.data.get('userId')
    address=request.data.get('address')
    paymentMode=request.data.get('paymentMode')
    cardNumber=request.data.get('cardNumber')
    expiry=request.data.get('expiry')
    cvv=request.data.get('expiry')
    try:
        order=Order.objects.filter(user_id=userId,is_order_placed=False)
        order_number=make_unique_order_number()
        order.update(order_number=order_number,is_order_placed=True)
        OrderAddress.objects.create(
            user_id=userId,
            order_number=order_number,
            address=address
        )

        PaymentDetails.objects.create(
            user_id=userId,
            order_number=order_number,
            payment_mode=paymentMode,
            card_number=cardNumber if paymentMode == 'online' else None,
            expiry_date=expiry if paymentMode == 'online' else None,
            cvv=cvv if paymentMode == 'online' else None
        )

        return Response({
            'message':f"order placed successfully order number {order_number}"
        },status=201)
    except Exception as e:
        print(e)
        return Response({'message':"something went wrong please try again later"},status=401)


@api_view(['GET'])
def my_orders(request,userId):
    orders=OrderAddress.objects.filter(user_id=userId).order_by('-id')
    serializer=MyorderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def order_by_order_number(request,order_number):
    order=Order.objects.filter(order_number=order_number).select_related('food')
    serializer=OrderSerializers(order,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def order_address(request,order_number):
    address=OrderAddress.objects.filter(order_number=order_number).first()
    serializer=OrderAddressSerializer(address)
    return Response(serializer.data)

from django.shortcuts import render
def generate_invoice(request,order_number):
    orders=Order.objects.filter(order_number=order_number,is_order_placed=True)
    address=OrderAddress.objects.get(order_number=order_number)

    order_data=[]
    grand_total=0
    for order in orders:
        total=order.food.item_price * order.quantity
        grand_total+=total
        order_data.append({
            'food':order.food,
            'quantity':order.quantity,
            'total_price':total
        })

    return render(request,"invoice.html",{
        'order_data':order_data,
        'grand_total':grand_total,
        'address':address,
        'order_number':order_number
    })

@api_view(['GET'])
def FetchuserDetails(request,userId):
   user=User.objects.get(id=userId)
   serializer=UserSerializers(user)
   return Response(serializer.data)

@api_view(['PUT'])
def user_update(request,userId):
    user=User.objects.get(id=userId)
    serializer=UserSerializers(user,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message':'Profile Updated Successfully'
        },status=200)
    return Response({
        'message':'Something went wrong'
    },status=400)

@api_view(['PUT'])
def change_password(request):
    email_password = request.data.get('email_password')
    new_password = request.data.get('new_password')
    user_id = request.data.get('userId')

    if not all([email_password, new_password,user_id]):
        return Response(
            {'message': 'All fields are required.'},
            status=400
        )

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {'message': 'User not found.'},
            status=400
        )


    if check_password(email_password, user.password):
        pass
    elif user.email == email_password:
        pass
    else:
        return Response(
            {'message': 'Invalid email or current password.'},
            status=400
        )

    user.password = make_password(new_password)
    user.save()

    return Response(
        {'message': 'Password changed successfully.'},
        status=200
    )

@api_view(['GET'])
def order_not_confirmed(request):
    order=OrderAddress.objects.filter(order_final_status__isnull=True).order_by('-id')
    serializer=OrderSummarySerializer(order,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def order_confirmed(request):
    order=OrderAddress.objects.filter(order_final_status="Order Confirmed").order_by('-id')
    serializer=OrderSummarySerializer(order,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def food_being_prepared(request):
    order=OrderAddress.objects.filter(order_final_status="Food Being Prepared").order_by('-id')
    serializer=OrderSummarySerializer(order,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def food_pickup(request):
    order=OrderAddress.objects.filter(order_final_status="Food Pickup").order_by('-id')
    serializer=OrderSummarySerializer(order,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def food_delivered(request):
    order=OrderAddress.objects.filter(order_final_status="Food Delivered").order_by('-id')
    serializer=OrderSummarySerializer(order,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def order_cancelled(request):
    order=OrderAddress.objects.filter(order_final_status="Order Cancelled").order_by('-id')
    serializer=OrderSummarySerializer(order,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def all_orders(request):
    order=OrderAddress.objects.all().order_by('-id')
    serializer=OrderSummarySerializer(order,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def order_between_dates(request):
    from_date=request.data.get('from_date')
    to_date=request.data.get('to_date')
    status=request.data.get('status')
    order=OrderAddress.objects.filter(order_time__date__range=[from_date,to_date])
    if status == 'Not_Confirmed':
        order=OrderAddress.objects.filter(order_final_status__isnull=True).order_by('-id')
    elif status!='All':
        order=OrderAddress.objects.filter(order_final_status=status).order_by('-id')
    serializer=OrderSummarySerializer(order,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def view_order_details(request,order_number):
    
    try:
        order_address=OrderAddress.objects.select_related('user').get(order_number=order_number)
        ordered_foods=Order.objects.filter(order_number=order_number).select_related('food')
        tracker=FoodTracker.objects.filter(order__order_number=order_number).select_related('order')
    except:
        return Response({
            'message':'something went wrong'
        },status=404)

    return Response({
        'order':OrderDetailSerializer(order_address).data,
        'foods':OrderFoodSerializer(ordered_foods,many=True).data,
        'tracking':FoodTrackingSerializer(tracker,many=True).data
    }) 

@api_view(['POST'])
def update_order_status(request):
    order_number=request.data.get('order_number')
    new_status=request.data.get('status')
    remark=request.data.get('remark')
    try:
        address=OrderAddress.objects.get(order_number=order_number)
        order=Order.objects.filter(order_number=order_number).first()
        if not order:
            return Response({'error':'order not found'},status=404)
        FoodTracker.objects.create(
            order=order,remark=remark,status=new_status,order_cancelled_by_user=False
        )
        address.order_final_status=new_status
        address.save()
        return Response({'message':'Order status updated successfully'},status=200)
    except :
        return Response({'error':'Invalid order name'},status=404)

@api_view(['GET'])
def order_search(request):
    query=request.GET.get('q','')
    if query:
        orders=OrderAddress.objects.filter(order_number__icontains=query)
    else:
        orders=[]
    serializer=OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)
    