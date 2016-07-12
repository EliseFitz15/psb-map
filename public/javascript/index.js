var visibleMarkers = []
var hiddenMarkers = []
var boston = { lat: 42.3601, lng: -71.0589 }

var styles = [
  {
    "featureType": "transit.station",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.business",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.place_of_worship",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.school",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.attraction",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.government",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.medical",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "color": "#63666A" },
      { "lightness": 53 },
      { "visibility": "simplified" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" },
      { "color": "#999999" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "visibility": "on" },
      { "color": "#009CDE" },
      { "lightness": -15 }
    ]
  },{
  },{
  }
]

var has_clues_image = {
  url: 'https://s3.amazonaws.com/map-pins/img_bus_stop_has_clues.png?X-Amz-Date=20160712T212124Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=f0b797ab9074bd48612dd42ba790f64b3c1188f1057114535e612e8504b8dff1&X-Amz-Credential=ASIAIA2N4ASCZ7NZIEIA/20160712/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEE4aDEHlL/jtnNf3UN6eACLvAmjVALInpLzonKjj8UixWbCR3AMkXYc/SG%2BdSd6eEWEIfVqtTk2eMOz9ogPpw/VEsHPcmwwX%2BprmNGK6yFgmMElrvCAvaIJFcGI0ifvk6gikMtLtSLyqCTKx7/VUgFFz4aI8POFrRDQoTlM6GIJ3tAOiAOtOc8Pgf86OoAZvw5Q42MfREvfSIYpjGz1CEeC/ICkQkPYYYAG0/K9OM9riG3wfHpjpn1OaLYFGvrR9/naNlS4o52fdT61tprjE3wDHUqUGma9lrmmJx%2ByZxWz5nJ0g95whuoAXxI0cQNyI%2B9bpsMD7ISsrXDEXN%2Bjhy5MxEwtmO4WFhrunDGXLnbUVXDcPuL6wZCTTtPfisoJ/vj/jZStHeCDpN0eoYTLZKq32abFHDCo0vVrsECcdbuq8Mgu9xERrvIRFRF0YY4lFhtfF5HiYAyKELToD1Ho0Hh%2BfZdF6mDkcQy7vAtc%2BtQX8H%2BtZ4VdPeco8dQmuu6%2Bm9iQo0r2VvAU%3D',
  size: new google.maps.Size(17, 17),
  origin: new google.maps.Point(0, 0),
  scaledSize: new google.maps.Size(13, 13)
};

var needs_clues_image = {
  url: 'https://s3.amazonaws.com/map-pins/img_bus_stop_needs_clues.png?X-Amz-Date=20160712T212152Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=a80daeeafe9118bec67d955c05a26cfb71d19757f741057bada00f316ce2821e&X-Amz-Credential=ASIAIA2N4ASCZ7NZIEIA/20160712/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEE4aDEHlL/jtnNf3UN6eACLvAmjVALInpLzonKjj8UixWbCR3AMkXYc/SG%2BdSd6eEWEIfVqtTk2eMOz9ogPpw/VEsHPcmwwX%2BprmNGK6yFgmMElrvCAvaIJFcGI0ifvk6gikMtLtSLyqCTKx7/VUgFFz4aI8POFrRDQoTlM6GIJ3tAOiAOtOc8Pgf86OoAZvw5Q42MfREvfSIYpjGz1CEeC/ICkQkPYYYAG0/K9OM9riG3wfHpjpn1OaLYFGvrR9/naNlS4o52fdT61tprjE3wDHUqUGma9lrmmJx%2ByZxWz5nJ0g95whuoAXxI0cQNyI%2B9bpsMD7ISsrXDEXN%2Bjhy5MxEwtmO4WFhrunDGXLnbUVXDcPuL6wZCTTtPfisoJ/vj/jZStHeCDpN0eoYTLZKq32abFHDCo0vVrsECcdbuq8Mgu9xERrvIRFRF0YY4lFhtfF5HiYAyKELToD1Ho0Hh%2BfZdF6mDkcQy7vAtc%2BtQX8H%2BtZ4VdPeco8dQmuu6%2Bm9iQo0r2VvAU%3D',
  size: new google.maps.Size(17, 17),
  origin: new google.maps.Point(0, 0),
  scaledSize: new google.maps.Size(13, 13)
};

function setHeader(xhr) {
  xhr.setRequestHeader('Authorization', 'Token 2adc95279bbd2a6a69a5f08ddd2325562a262736');
}
$.ajax({
  url: "https://perkins-dev.raizlabs.xyz/agencies/1/stops?needs_more_clues=1",
  type: 'GET',
  crossDomain: true,
  success: function(data) {
    data.forEach(function(stop) {
      visibleMarkers.push(stop);
    });
    initMap();
  },
  beforeSend: setHeader
});

$.ajax({
  url: "https://perkins-dev.raizlabs.xyz/agencies/1/stops?needs_more_clues=0",
  type: 'GET',
  crossDomain: true,
  success: function(data) {
    data.forEach(function(stop) {
      var infoWindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        position: stop["location"],
        title: stop["name"],
        visible: false,
        icon: has_clues_image
      });

      google.maps.event.addListener(marker, "click", (function(marker) {
        return function() {
          infoWindow.setContent(
            "<div>" +
            "<p><span style='font-weight:bold;'>Name: </span>" + stop["name"] + "</p>" +
            "</div>"
          );
          infoWindow.open(map, marker);
        }
      })(marker));
      hiddenMarkers.push(marker);
    });
  },
  beforeSend: setHeader
});


function initMap() {
  var mapElement = document.getElementById('map');
  var mapOptions = {
    zoom: 13,
    center: boston,
    styles: styles
  };
  var map = new google.maps.Map(mapElement, mapOptions);
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  for (var i = 0; i < visibleMarkers.length; i++) {
    var infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      position: visibleMarkers[i]["location"],
      title: visibleMarkers[i]["name"],
      map: map,
      icon: needs_clues_image
    });

    google.maps.event.addListener(marker, "click", (function(marker, i) {
      return function() {
        infoWindow.setContent(
          "<div>" +
            "<p><span style='font-weight:bold;'>Name: </span>" + visibleMarkers[i]["name"] + "</p>" +
          "</div>"
        );
        infoWindow.open(map, marker);
      }
    })(marker, i));
  }

  $('#zip-search').on('submit', function(e){
    e.preventDefault();
    var zipCode = $('#zip-search-input').val();

    var zipRequest = $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?&address=" + zipCode + "",
      type: 'GET'
    });
    zipRequest.done(function(data){
      var point = data["results"][0]["geometry"]["location"];
      map.setCenter(point);
      map.setZoom(15);
    });
    $('#zip-search-input').val("");
  });

  $(".toggle-all-stops").click(function () {
    $(this).text(function(i, v){
      return v === 'Show Stops w/ Clues' ? 'Hide Stops w/ Clues' : 'Show Stops w/ Clues'
    });
    for (var i = 0; i < hiddenMarkers.length; i++) {
      if(hiddenMarkers[i].getVisible()) {
        hiddenMarkers[i].setVisible(false);
      } else {
        hiddenMarkers[i].setVisible(true);
        hiddenMarkers[i].setMap(map);
      };
    };
  });
}

function CenterControl(controlDiv, map) {
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '12px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);
  controlUI.addEventListener('click', function() {
    map.setCenter(boston);
    map.setZoom(13);
  });
}

var styles = [
  {
    "featureType": "transit.station",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.business",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.place_of_worship",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.school",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.attraction",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.government",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.medical",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "color": "#63666A" },
      { "lightness": 53 },
      { "visibility": "simplified" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" },
      { "color": "#999999" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "visibility": "on" },
      { "color": "#009CDE" },
      { "lightness": -15 }
    ]
  },{
  },{
  }
]
