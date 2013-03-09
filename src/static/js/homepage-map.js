var CommunityDiscussions = CommunityDiscussions || {};

(function(CD, $) {
  CD.initHomepageMap = function(options) {
    var map = new L.Map(options.el, {
          scrollWheelZoom: false
        }),
        layer = new L.TileLayer(options.tileUrl, {maxZoom: 17, attribution: options.tileAttribution}),
        featureGroup = L.featureGroup().addTo(map),
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
      $listItem.addClass('is-active');

      // Zoom the map to the shape
      map.fitBounds(shape.getBounds());
    };

    $(function() {
      // Set the view to the default center in case there are no places
      map.setView(options.center, 14).addLayer(layer);

      for (i=0, len=options.watchAreas.length; i<len; i++) {
        watchArea = options.watchAreas[i];

        // Construct the fence's shape and bind events
        shape = L.geoJson(watchArea.fence);
        shape.watchArea = watchArea;

        shape.on('click', function(e) {
          activateWatchAreaLayer(this);
        });

        $(watchArea.selector).data('shape', shape);
        $(watchArea.selector).click(function(e) {
          e.preventDefault();
          activateWatchAreaLayer($(this).data('shape'));
        });

        // Add the shape to the feature group
        featureGroup.addLayer(shape);
      }


      for(i=0, len=options.topics.length; i<len; i++) {
        topic = options.topics[i];

        // Construct and bind events to the topic marker
        marker = L.marker([topic.place.y, topic.place.x], { icon: options.icon });
        marker.bindPopup('<a href="'+topic.url+'">'+topic.name+'</a>');

        // Add to the feature group (already on the map)
        featureGroup.addLayer(marker);
      }

      if (len) {
        // Fit the map to all the features
        map.fitBounds(featureGroup.getBounds());
      }
    });
  };
})(CommunityDiscussions, jQuery);
