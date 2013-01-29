var CommunityDiscussions = CommunityDiscussions || {};

(function(CD) {
  CD.initFormMap = function(options) {
    var $input = $('#' + options.inputEl),
        map = new L.Map(options.el),
        layer = new L.TileLayer(options.tileUrl, {maxZoom: 17, attribution: options.tileAttribution});

    map.setView(options.center, 13).addLayer(layer);
    setPlace(map.getCenter());

    map.on('move', function(evt) {
      setPlace(map.getCenter());
    });

    function setPlace(latLng) {
      var wkt = 'POINT ('+ latLng.lng +' '+ latLng.lat +')';
      $input.val(wkt);
    }
  };
})(CommunityDiscussions);