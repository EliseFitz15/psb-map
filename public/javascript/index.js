var visibleMarkers = []
var hiddenMarkers = []
var boston = { lat: 42.3601, lng: -71.0589 }

var indoorStops = ["Harvard Lower Busway @ Red Line",
"Harvard Upper Busway @ Red Line",
"Alewife Station Busway",
"Kenmore Station Busway",
"Forest Hills Station Lower Busway",
"Forest Hills Station Upper Busway",
"Ruggles Sta - Upper Level",
"Andrew Station Busway",
"Wellington Station Busway",
"Columbia Rd @ JFK/UMASS Station",
"Fields Corner Station @ Red Line",
"Dorchester Ave @ Ashmont Busway",
"Burgin Pkwy @ Quincy Center Station",
"N Quincy Station @ Red Line"]

var hasCluesImage = {
  url: 'images/img_bus_stop_has_clues.png',
  size: new google.maps.Size(17, 17),
  origin: new google.maps.Point(0, 0),
  scaledSize: new google.maps.Size(13, 13)
};

var needsCluesImage = {
  url: 'images/img_bus_stop_needs_clues.png',
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
      if (jQuery.inArray(stop["name"], indoorStops) < 0) {
        visibleMarkers.push(stop);
      };
    });
    initMap();
    displayButtons();
    getStopsWithClues();
  },
  beforeSend: setHeader
});

function getStopsWithClues() {
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
          icon: hasCluesImage
        });

        google.maps.event.addListener(marker, "click", (function(marker) {
          return function() {
            infoWindow.setContent(
              "<div>" +
              "<p><span style='font-weight:bold;'>/Bus Stop: </span>" + stop["name"] + "</p>" +
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
}


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

  visibleMarkers.forEach(function(stop){
    var infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      position: stop["location"],
      title: stop["name"],
      map: map,
      icon: needsCluesImage
    });

    google.maps.event.addListener(marker, "click", (function(marker) {
      return function() {
        infoWindow.setContent(
          "<div>" +
          "<p><span style='font-weight:bold;'>Bus Stop: </span>" + stop["name"] + "</p>" +
          "</div>"
        );
        infoWindow.open(map, marker);
      }
    })(marker));
  })

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
    hiddenMarkers.forEach(function(marker) {
      if(marker.getVisible()) {
        marker.setVisible(false);
      } else {
        marker.setVisible(true);
        marker.setMap(map);
      };
    });
  });
}

function displayButtons() {
  $('.toggle-all-stops').css('display', 'block');
  $('.form-container').css('display', 'block');
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
  controlText.style.color = '#222222';
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
