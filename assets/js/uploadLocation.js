const uploadContainer = document.querySelector(".upload");

const { google } = window;
let map;
let userLocation;
let marker;
let storeLocation;

const handleMarker = (infowindow, name, location) => {
  const placeName = name;
  const lat = location.lat();
  const lng = location.lng();
  infowindow.setContent(placeName);
  infowindow.open(map);
  infowindow.setPosition({ lat, lng });
};
const sendPlaceName = (placeName, location) => {
  storeLocation.value = `${location
    .lat()
    .toString()}, ${location.lng().toString()}, ${placeName}`;
};

const initSearchInput = () => {
  const searchInput = document.querySelector("#search-location__input");
  const options = {
    componentRestriction: { country: "kr" },
    fields: ["formatted_address", "geometry", "name"],
  };

  const autocomplete = new google.maps.places.Autocomplete(
    searchInput,
    options
  );
  autocomplete.bindTo("bounds", map);
  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.querySelector("#jsInfoWindow");
  infowindow.setContent(infowindowContent);

  marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });
  autocomplete.addListener("place_changed", () => {
    const placeNameElem = document.querySelector("#jsPlaceName");
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    const {
      name: placeName,
      geometry: { location },
    } = place;

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      sendPlaceName(placeName, location);
      handleMarker(infowindow, placeName, location);
    } else {
      map.setCenter(location);
      map.setZoom(17);
    }
    marker.setPosition(location);
    marker.setVisible(true);
    if (placeNameElem) {
      placeNameElem.textContent = placeName;
      infowindow.open(map, marker);
    }
  });
};

const sendLocation = () => {
  storeLocation = document.querySelector("#jsCoordinates");
  storeLocation.value = `${userLocation.lat}, ${userLocation.lng}`;
  if (userLocation) {
    map.setCenter(userLocation);
  }
};
const moveMark = (event) => {
  const draggedPos = event.latLng;
  marker.setMap(null);
  marker = new google.maps.Marker({
    position: draggedPos,
    map,
    title: "Click to zoom",
  });
  userLocation.lat = marker.getPosition().lat();
  userLocation.lng = marker.getPosition().lng();
  sendLocation();
};
const panToMarker = () => {
  window.setTimeout(() => {
    map.panTo(marker.getPosition());
  }, 3000);
};

const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "위치정보 이용에 대한 액세스 권한이 없습니다."
      : "지원하지 않는 브라우저입니다."
  );
  infoWindow.open(map);
};
const getUserLocation = () => {
  // eslint-disable-next-line no-new
  const infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // eslint-disable-next-line no-new
        marker = new google.maps.Marker({
          position: userLocation,
          map,
          title: "Click to zoom",
        });
        map.setZoom(14);
        map.addListener("center_changed", panToMarker);
        map.addListener("click", moveMark);
        sendLocation();
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
};

const initMap = () => {
  const seoul = { lat: 37.5642135, lng: 127.0016985 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: seoul,
    mapId: process.env.mapId,
  });
  if (uploadContainer) {
    getUserLocation();
  }
};

if (uploadContainer) {
  google.maps.event.addDomListener(window, "load", initMap);
  google.maps.event.addDomListener(window, "load", initSearchInput);
}
