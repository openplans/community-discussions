from django.conf import settings as django_settings
from pybb.models import WatchArea

def settings(request):
    return {'settings': django_settings}

def global_link_helpers(request):
    return {
        'available_watch_areas': WatchArea.objects.for_user(request.user).order_by('-public', 'name'),
        'default_forum_id': django_settings.PYBB_FORUM_ID,
    }
