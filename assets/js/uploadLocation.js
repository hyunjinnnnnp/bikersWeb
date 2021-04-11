const uploadContainer = document.querySelector(".upload");
const searchInput = document.querySelector("#search-location__input");
const { google } = window;
let map;
let userLocation;
let marker;
let storeLocation;
let infoWindow;

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
  const options = {
    componentRestriction: { country: "kr" },
    fields: ["formatted_address", "geometry", "name"],
  };

  const autocomplete = new google.maps.places.Autocomplete(
    searchInput,
    options
  );
  autocomplete.bindTo("bounds", map);
  infoWindow = new google.maps.InfoWindow();
  const infowindowContent = document.querySelector("#jsInfoWindow");
  infoWindow.setContent(infowindowContent);

  marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });
  autocomplete.addListener("place_changed", () => {
    const placeNameElem = document.querySelector("#jsPlaceName");
    infoWindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    const {
      name: placeName,
      geometry: { location },
    } = place;

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      sendPlaceName(placeName, location);
      handleMarker(infoWindow, placeName, location);
    } else {
      map.setCenter(location);
      map.setZoom(17);
    }
    marker.setPosition(location);
    marker.setVisible(true);
    if (placeNameElem) {
      placeNameElem.textContent = placeName;
      infoWindow.open(map, marker);
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
const draggedLocation = (latLng) => {
  const lat = latLng.lat();
  const lng = latLng.lng();
  marker.setMap(null);
  marker = new google.maps.Marker({
    position: { lat, lng },
    map,
    draggable: true,
  });
  userLocation = { lat, lng };
  searchInput.value = "";
  infoWindow = new google.maps.InfoWindow();
  infoWindow.setPosition({ lat, lng });
  infoWindow.setContent("장소를 검색해주세요");
  infoWindow.open(map);
  sendLocation();
};
const panToMarker = () => {
  window.setTimeout(() => {
    map.panTo(marker.getPosition());
  }, 3000);
};

const handleLocationError = (browserHasGeolocation, pos) => {
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
  infoWindow = new google.maps.InfoWindow();
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
          draggable: true,
        });
        map.setZoom(14);
        map.addListener("center_changed", panToMarker);
        map.addListener("click", (e) => {
          draggedLocation(e.latLng);
        });
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
