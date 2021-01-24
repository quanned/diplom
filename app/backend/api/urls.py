from django.urls import path, include

from api.products import (
    InitializeDataView,
    ProductsView,
    ProductView,
)
from api.message import EmailMessageView
from api.card import CardAPIView
from api.orders import OrderAPIView
from api.account import AccountInfoAPIView, RegisterAPIView


urlpatterns = [
    path('init', InitializeDataView.as_view()),
    path('products', ProductsView.as_view()),
    path('products/<int:id>', ProductView.as_view()),
    path('message', EmailMessageView.as_view()),

    path('card', CardAPIView.as_view()),
    path('order', OrderAPIView.as_view()),
    path('account', AccountInfoAPIView.as_view()),
    path('account/register', RegisterAPIView.as_view()),

    path('', include('drf_registration.urls'))
]