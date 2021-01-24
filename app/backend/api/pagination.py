from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from django.conf import settings


class StandardResultsPagination(PageNumberPagination):
    page_size = settings.PAGE_SIZE
    page_size_query_param = 'limit'
    max_page_size = settings.PAGE_SIZE

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'has_next': bool(self.get_next_link()),
                'has_prev': bool(self.get_previous_link())
            },
            'count': self.page.paginator.count,
            'results': data,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
        })