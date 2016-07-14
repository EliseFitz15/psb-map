#Custom Google Map for Boston Bus Stops

## Files Included
- `map.js` this file has the Javascript that will produce the calls to collect the data populate and center the map. This file also contains the controls for the buttons on the map.

- `map.html` this file includes the necessary HTML that will render with the associated Javascript.

- `routes.js` this file has the JS that pulls the data into the dropdown and then also the query for the bus stops depending on the clicked route.

- `routes.html` this file has the html where the the form and list is populated by the JS.

- `style.css` this is a stylesheet with all of the CSS for both features. The class names and ID's should be unique enough to not collide with existing website css.

- Image files, we have provided `.png` files for the orange and blue bus stop symbols.

## Libraries and API links
This map is leveraging the jQuery Javascript library, ParsleyJS validation library and Google Maps API. Below are those library links you will need to insert for this to work.

The two library scripts should be placed in the head of the page as seen below:

```html
<head>  
  <script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
  <script src="https://rawgit.com/guillaumepotier/Parsley.js/master/dist/parsley.js"></script>
</head>
```

The Google map API script should be linked to the bottom of the body tag so that it loads *after* the rest of the content on the page but *before* the rest of JS that buildings the map.

```html
...
<script src="https://maps.googleapis.com/maps/api/js?key=THisiSwhEreTHeGoOGleAPIkeyGoEs"></script>
<script src="javascript/map.js"></script>
</body>
```
**Note:** The end of the script URL needs the Google maps generates key. You should be able to generate one [here.](https://developers.google.com/maps/documentation/javascript/)

##Map Sizing
The key to the map displaying is this HTML div found on line 3:
`<div id="map" style='width:100%; height: 100%;'></div>`

Google Maps looks specifically for an id of `map`, so changing that will break the map. Also if adds initial styling and formatting. As a default is height and width of 100%. With the overlay buttons and form, to change the height and width for the entire feature look to the CSS for the div with the map-container class (line XX) changing the height and width there will change it's size.

##Images

There are two options for including the images for the bus stop icons. The simplest would be to upload them somewhere in the Drupal site and link to them on lines XX and XX of the `map.js` file. If that doesn't work hosting them somewhere online such as in a Amazon S3 storage bucket is also an option but would need some configuration and access keys (free with this size limit but the token would need to be hidden securely).

## Drupal Google Maps module
This implementation uses the Google Maps Javascript API library. During research I came across the Drupal Google Maps module which may need to be enabled.

Questions for Aakar/Jason
- Should I just include the production api links? and auth token?
- Tokens for APIs, S3
