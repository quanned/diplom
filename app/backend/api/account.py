from django.conf import settings
from django.core.mail import send_mail

from rest_framework.views import APIView
from rest_framework.response import Response

from drf_registration.api.register import RegisterView

from card.models import Order


class AccountInfoAPIView(APIView):

    def get(self, request):
        result = {'info': None, 'orders': {'data': [], 'amount': 0, 'count': 0}}

        orders = Order.objects.filter(user=request.user).order_by('created_at')
        if orders.exists():
            last_order = orders.first()

            result['info'] = {
                'address': last_order.address,
                'email': last_order.email,
                'phone': last_order.phone,
                'initials': last_order.initials,
            }

        for order in orders:
            result['orders']['data'].append({
                'id': order.id,
                'date': order.created_at.strftime('%m.%d.%Y %H:%M:%S'),
                'status': 'На рассмотрении' if not order.is_active else 'Отправлен',
                'amount': order.amount_and_count.get('amount')
            })

            result['orders']['amount'] = result['orders']['amount'] + order.amount_and_count.get('amount')
            result['orders']['count'] = result['orders']['count'] + order.amount_and_count.get('count_')

        return Response(result)


class RegisterAPIView(RegisterView):

    def create(self, request, *args, **kwargs):
        response = super().create(request, args, kwargs)

        data = (
            "Вы были зарегестрированы в системе «Свiтанак»\n"
            "В дальнейшем вы можете использовать следующие данные для входа:\n"
            f"Логин: {request.data.get('email')}\n"
            f"Пароль: {request.data.get('password')}\n"
        )

        send_mail(
            'Регистрация прошла успешно!',
            data,
            settings.EMAIL_HOST_USER,
            [request.data.get('email'), ],
            fail_silently=False
        )
        return response