from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from views import ForumView

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),

    # Override the index view in pybb
    url('^forum/$', ForumView.as_view(), name='global_forum'),
    (r'^', include('pybb.urls', namespace='pybb')),
    (r'^accounts/', include('registration.urls')),

)
