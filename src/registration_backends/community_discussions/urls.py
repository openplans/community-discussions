"""
URLconf for registration and activation, using django-registration's
default backend.

Largely lifted from registration.backends.default.urls
"""


from django.conf.urls.defaults import *
from django.views.generic.simple import direct_to_template

from registration.views import activate
from registration.views import register
from django.contrib.auth.views import logout


urlpatterns = patterns('',
#                       url(r'^activate/(?P<activation_key>\w+)/$',
#                           activate,
#                           {'backend': 'registration.backends.default.DefaultBackend'},
#                           name='registration_activate'),
                       url(r'^register/$',
                           register,
                           {'backend': 'registration_backends.community_discussions.CommunityDiscussionsBackend'},
                           name='registration_register'),
#                       url(r'^register/complete/$',
#                           direct_to_template,
#                           {'template': 'registration/registration_complete.html'},
#                           name='registration_complete'),
#                       url(r'^register/closed/$',
#                           direct_to_template,
#                           {'template': 'registration/registration_closed.html'},
#                           name='registration_disallowed'),
                       url(r'^logout/$',
                           logout,
                           {'next_page': '/',
                            'template_name': 'registration/logout.html'},
                           name='auth_logout'),
                       (r'', include('registration.backends.default.urls')),
                       )
