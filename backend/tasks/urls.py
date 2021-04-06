from django.urls import path
from tasks.views import test_response, SectionList

urlpatterns = [
    path('api/tasks/test', test_response, name="test-response"), 
    path('api/sections', SectionList.as_view(), name="section-list")
]