import re

from django.core.mail import send_mail
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST


class EmailMessageView(APIView):

    def post(self, request):
        data = request.data
        first_name = data.get('first_name')
        email = data.get('email')
        phone = data.get('phone')
        message = data.get('message')

        if not first_name:
            return Response("Имя не было заполнено.", status=HTTP_400_BAD_REQUEST)

        if not isinstance(email, str):
            return Response("Email не был указан.", status=HTTP_400_BAD_REQUEST)
        elif isinstance(email, str) and not re.match(r"^.+@(\[?)[a-zA-Z0-9-.]+.([a-zA-Z]{2,3}|[0-9]{1,3})(]?)$", email):
            return Response("Email был указан неверно.", status=HTTP_400_BAD_REQUEST)

        if not isinstance(phone, str):
            return Response("Телефон не был указан.", status=HTTP_400_BAD_REQUEST)
        elif isinstance(phone, str) and not re.match(r"(\+375)?(\s*)?(\d{9})", phone):
            return Response("Телефон был указан неверно.", status=HTTP_400_BAD_REQUEST)
        if not message:
            return Response("Сообщение не было заполнено.", status=HTTP_400_BAD_REQUEST)

        data = (
            "Поступила новая заявка\n"
            f"Имя: {first_name}\n"
            f"Email: {email}\n"
            f"Телефон: {phone}\n"
            f"Текст сообщения: {message}\n"
        )

        send_mail(
            'Новая заявка',
            data,
            settings.EMAIL_HOST_USER,
            settings.EMAILS_FOR_MESSAGES,
            fail_silently=False
        )

        return Response(status=200)