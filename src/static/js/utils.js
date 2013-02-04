var CommunityDiscussions = CommunityDiscussions || {};

(function(CD) {
  CD.Utils = {
    // https://gist.github.com/4248238 Thanks Bryan!
    toWKT: function(layer) {
      var lng, lat, coords = [];
      if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
        $.each(layer.getLatLngs(), function(index,value) {
          coords.push(value.lng + ' ' + value.lat);
          if (index === 0) {
            lng = value.lng;
            lat = value.lat;
          }
        });
        if (layer instanceof L.Polygon) {
          return 'POLYGON((' + coords.join(',') + ',' + lng + ' ' + lat + '))';
        } else if (layer instanceof L.Polyline) {
          return 'LINESTRING(' + coords.join(',') + ')';
        }
      } else if (layer instanceof L.Marker) {
        return 'POINT(' + layer.getLatLng().lng + ' ' + layer.getLatLng().lat + ')';
      }
    }
  };

})(CommunityDiscussions);