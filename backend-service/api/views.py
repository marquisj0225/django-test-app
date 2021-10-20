from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, viewsets
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication

class JobViewSet(viewsets.ModelViewSet):
    """
    A ViewSet For Jobs
    """ 
    queryset = Job.objects.all()
    serializer_class = JobSerializer 

    def list(self, request, *args, **kwargs):  
        jobs = Job.objects.all()
        context = []
        for job in jobs:
            context.append({
                "id": job.id,
                "title": job.title,
                "skills": [skill.name for skill in job.skills.all()] ,
                "description": job.description,
            }) 
        return Response(context, status=status.HTTP_200_OK)


    def create(self, request, *args, **kwargs):
        title = request.data['title']
        skills = request.data['skill']
        description = request.data['description'] 

        job = Job.objects.create(title=title, description=description)
        for skill in skills:
            if(skill == ''):
                continue
            skill = skill.capitalize() 
            try:
                skill = Skill.objects.get(name=skill)
                skill.used += 1
                skill.save()
            except Skill.DoesNotExist:
                skill = Skill.objects.create(name=skill, used=1)
            job.skills.add(skill)
            skill.save()
        return Response({"success": True, "description": "Job Added Auccessfully"}, status=status.HTTP_200_OK)



        print(request.data)
        

    def retrieve(self, request, *args, **kwargs):
        try:
            job = Job.objects.get(id=kwargs['pk'])
        except Job.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)    
        context = {
            "id": job.id,
            "title": job.title,
            "skills": [skill.name for skill in job.skills.all()] ,
            "description": job.description,
        }
        return Response(context, status=status.HTTP_200_OK)




class SkillViewSet(viewsets.ModelViewSet):
    """
    A ViewSet For the Skill model
    """
    queryset = Skill.objects.all().order_by('-used')
    serializer_class = SkillSerializer 
