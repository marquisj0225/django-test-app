from rest_framework import routers
from .views import *


router = routers.SimpleRouter()
router.register(r'jobs', JobViewSet)
router.register(r'skills', SkillViewSet)
urlpatterns = router.urls