var CommunityDiscussions = CommunityDiscussions || {};

(function(CD, $) {
  CD.initHomepageMap = function(options) {
    var map = new L.Map(options.el, {
          scrollWheelZoom: false
        }),
        layer = new L.TileLayer(options.tileUrl, {maxZoom: 17, attribution: options.tileAttribution}),
        watchAreaGroup = L.featureGroup().addTo(map),
        featureGroup = L.featureGroup().addTo(map),

        // TODO: This style is used in several places. Should be added as a
        //       global configuration.
        shapeActiveStyle = {
          color: '#478e23',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.3
        },
        shapeInactiveStyle = {
          color: '#888',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.3
        },

        topic, watchArea, itemSelector, i, len, marker;

    var activateWatchAreaLayer = function(shape) {
      var $listItem = $(shape.watchArea.selector),
          $list = $listItem.parent(),
          itemOffset = $listItem.position().top,
          itemHeight = $listItem.height(),
          listOffset = $list.scrollTop(),
          listHeight = $list.height();

      // Move the list item to the top, if it's not all visible
      if (itemOffset < 0 || (itemOffset+itemHeight) > listHeight) {
        $list.animate({scrollTop: itemOffset + listOffset});
      }

      // Designate the item as active
      $('.is-active').removeClass('is-active');
      watchAreaGroup.setStyle(shapeInactiveStyle);

      $listItem.addClass('is-active');
      shape.setStyle(shapeActiveStyle);

      // Zoom the map to the shape
      map.fitBounds(shape.getBounds());
    };

    $(function() {
      // Set the view to the default center in case there are no places
      map.setView(options.center, 14).addLayer(layer);

      for (i=0, len=options.watchAreas.length; i<len; i++) {
        watchArea = options.watchAreas[i];

        // Construct the fence's shape and bind events
        shape = L.geoJson(watchArea.fence, {style: shapeInactiveStyle});
        shape.watchArea = watchArea;

        shape.on('click', function(e) {
          activateWatchAreaLayer(this);
        });

        (function(shape) {
          $(watchArea.selector).click(function(e) {
            // Do not prevent default, so that links within the element still work.
            activateWatchAreaLayer(shape);
          });
        })(shape);

        // Add the shape to the watch area group
        watchAreaGroup.addLayer(shape);
      }


      for(i=0, len=options.topics.length; i<len; i++) {
        topic = options.topics[i];

        // Construct and bind events to the topic marker
        marker = L.marker([topic.place.y, topic.place.x], { icon: options.icon });
        marker.bindPopup('<a href="'+topic.url+'">'+topic.name+'</a>');

        // Add to the feature group (already on the map)
        featureGroup.addLayer(marker);
      }

      $('.watch-area-list time').each(function(i, time) {
        var timestamp = time.getAttribute('timestamp'),
            prettyTime = moment(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSS').fromNow();
        time.textContent = prettyTime;
      });

      if (len) {
        // Fit the map to all the features
        map.fitBounds(featureGroup.getBounds().extend(watchAreaGroup.getBounds()));
      }
    });
  };
})(CommunityDiscussions, jQuery);
