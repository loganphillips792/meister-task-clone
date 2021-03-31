from django.urls import path
from tasks.views import test_response

urlpatterns = [
    path('api/tasks/test', test_response, name="test-response")
]