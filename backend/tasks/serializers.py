from rest_framework import serializers 
from tasks.models import Section

class SectionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=30)
    color = serializers.CharField(max_length=6)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def create(self, validated_data):
        return Section.objects.create(**validated_data)
    
    def update(self, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.color = validated_data.get('color', instance.color)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance