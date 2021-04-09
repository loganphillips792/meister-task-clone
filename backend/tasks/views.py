from django.shortcuts import render
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import generics, status, permissions
from tasks.models import Section
from tasks.serializers import SectionSerializer

logger = logging.getLogger(__name__)

@api_view(['GET'])
def test_response(request):
    logger.info("Testing response...")
    return Response({ "msg" : 'Request was successful' })

class SectionList(generics.ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

# class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Section.objects.all()
#     serializer_class = SectionSerializer

@api_view(['GET', 'PUT', 'DELETE'])
def section_detail(request, pk):
    try:
        section = Section.objects.get(pk=pk)
    except Section.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = SectionSerializer(section)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = SectionSerializer(section, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)