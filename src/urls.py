from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from views import ForumView, AddPostView

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),

    # Intercept the following views from pybb
    url('^forum/$', ForumView.as_view(), name='global_forum'),
    url('^forum/(?P<forum_id>\d+)/topic/add/$', AddPostView.as_view(), name='add_topic'),

    (r'^', include('pybb.urls', namespace='pybb')),
    (r'^accounts/', include('registration_backends.community_discussions.urls')),

)
