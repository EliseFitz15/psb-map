// function setHeader(xhr) {
//
//   xhr.setRequestHeader('Authorization', 'Token 2adc95279bbd2a6a69a5f08ddd2325562a262736');
// }
// var request = $.ajax({
//     url: "https://perkins-dev.raizlabs.xyz/agencies/1/stops/search?lat=42.331591&lon=-71.076237&distance=1000&limit=5",
//     type: 'GET',
//     crossDomain: true,
//     success: function(response) {
//       alert("Success");
//       console.log(response);
//     },
//     beforeSend: setHeader
//
//   });
//
// request.done(function(data){
//   var markers = []
//   data.forEach(function(stop) {
//     if (stop["needs_more_clues"] === true) {
//       markers.push(stop["location"]);
//       $(".pin-list").append("<li>" + stop["name"] + "</li>");
//     };
//   });
//   return markers;
// });
