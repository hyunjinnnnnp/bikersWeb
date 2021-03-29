const userProfileWrapper = document.querySelector(".user-profile__wrapper");
let map;

const { google } = window;

const initMap = () => {
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const seoul = { lat: 37.5642135, lng: 127.0016985 };
  map = new google.maps.Map(document.querySelector("#userDetailMap"), {
    zoom: 12,
    center: seoul,
  });
  //   const markers = locations.map((location, i) => {
  //     return new google.maps.Marker({
  //       position: location,
  //       label: labels[i % labels.length],
  //     });
  //   });
  //   // Add a marker clusterer to manage the markers.
  //   new MarkerClusterer(map, markers, {
  //     imagePath:
  //       "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  //   });
};

if (userProfileWrapper) {
  google.maps.event.addDomListener(window, "load", initMap);
}
