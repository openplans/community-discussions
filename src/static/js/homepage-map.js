var CommunityDiscussions = CommunityDiscussions || {};

(function(CD) {
  CD.initHomepageMap = function(options) {
    var map = new L.Map(options.el, {
          scrollWheelZoom: false
        }),
        layer = new L.TileLayer(options.tileUrl, {maxZoom: 17, attribution: options.tileAttribution}),
        featureGroup = L.featureGroup().addTo(map),
        topic, i, len, marker;

    // Set the view to the default center in case there are no places
    map.setView(options.center, 14).addLayer(layer);

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
  };
})(CommunityDiscussions);