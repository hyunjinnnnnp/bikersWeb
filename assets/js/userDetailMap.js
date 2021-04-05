/* eslint-disable no-new */
import axios from "axios";
import MarkerClusterer from "@googlemaps/markerclustererplus";

const userDetailMap = document.querySelector("#jsUserDetailMap");
let map;
let locations;
const { google } = window;

const drawMarkers = () => {
  let infowindow;
  const markers = locations.map((location) => {
    const { name } = location;
    const [lat, lng] = location.mark.coordinates;
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent(name);
    return new google.maps.Marker({
      position: { lat, lng },
      map,
      visible: true,
      title: name,
    });
  });
  new MarkerClusterer(map, markers, {
    imagePath: "/clusterImg/m",
  });
};
const initMap = (data) => {
  locations = data;
  const seoul = { lat: 37.5642135, lng: 127.0016985 };
  map = new google.maps.Map(document.querySelector("#jsUserDetailMap"), {
    zoom: 6,
    center: seoul,
  });
  drawMarkers();
};

const init = async () => {
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
      const userLocations = response.data;
      //google.maps.event.addDomListener(window, "load", () => )
      initMap(userLocations);
    })
    .catch((error) => {
      console.log(error);
    });
};

if (userDetailMap) {
  window.addEventListener("touchstart", { passive: true });

  init();
}
