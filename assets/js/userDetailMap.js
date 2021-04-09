/* eslint-disable no-new */
import axios from "axios";
import MarkerClusterer from "@googlemaps/markerclustererplus";

const userDetailMap = document.querySelector("#jsUserDetailMap");
let map;
let locations;
const { google } = window;
let markers;

const drawMarkers = () => {
  let lat;
  let lng;

  markers = locations.map((location) => {
    [lat, lng] = location.mark.coordinates;
    return new google.maps.Marker({
      position: { lat, lng },
      map,
      visible: true,
      draggable: false,
      title: location.name,
    });
  });
  new MarkerClusterer(map, markers, {
    imagePath: "/clusterImg/m",
  });
};
const userDetailInitMap = () => {
  const seoul = { lat: 37.5642135, lng: 127.0016985 };
  map = new google.maps.Map(document.querySelector("#jsUserDetailMap"), {
    zoom: 6,
    center: seoul,
  });
  drawMarkers();
};
const userDetailInit = async () => {
  const urlPath = window.location.pathname;
  let userId;
  if (urlPath.split("/")[1] === "me") {
    userId = document.querySelector("#userId").innerText;
  } else {
    [, userId] = urlPath.split("/users/");
  }
  await axios
    .request({
      url: `/api/${userId}/get-user-locations`,
      method: "POST",
      data: {
        userId,
      },
    })
    .then((response) => {
      locations = response.data;
      userDetailInitMap();
    })
    .catch((error) => {
      console.log(error);
    });
};

if (userDetailMap) {
  window.addEventListener("touchstart", { passive: true });
  userDetailInit();
}
