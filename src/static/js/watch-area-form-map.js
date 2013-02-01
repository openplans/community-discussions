var CommunityDiscussions = CommunityDiscussions || {};

(function(CD) {
  CD.initWatchAreaMap = function(options) {
    var map = new L.Map(options.el, {scrollWheelZoom: false}),
        layer = new L.TileLayer(options.tileUrl, {maxZoom: 17, attribution: options.tileAttribution});

    map.setView(options.center, 13).addLayer(layer);

  };
})(CommunityDiscussions);