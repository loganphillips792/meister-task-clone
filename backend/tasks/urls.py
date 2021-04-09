from django.urls import path
from tasks.views import test_response, SectionList, section_detail

urlpatterns = [
    path('api/tasks/test', test_response, name="test-response"), 
    path('api/sections', SectionList.as_view(), name="section-list"), 
    path('api/sections/<int:pk>', section_detail, name="section-detail")
]