import axios from "axios";
import MarkerClusterer from "@googlemaps/markerclustererplus";

const userDetailMap = document.querySelector("#userDetailMap");
let map;
let locations;
const { google } = window;

const drawMarkers = () => {
  const markers = locations.map((location) => {
    const { name } = location;
    const [lat, lng] = location.mark.coordinates;
    return new google.maps.Marker({
      position: { lat, lng },
      title: name,
      map,
      visible: true,
    });
  });
  new MarkerClusterer(map, markers, {
    imagePath: "/clusterImg/m",
  });
};
const initMap = (data) => {
  locations = data;
  const seoul = { lat: 37.5642135, lng: 127.0016985 };
  map = new google.maps.Map(document.querySelector("#userDetailMap"), {
    zoom: 6,
    center: seoul,
  });
  drawMarkers();
};

const init = async () => {
  const userId = window.location.pathname.split("/users/")[1];
  //   if (urlPath === "/me") {        일단 유저디텔만. /me는 나중에
  await axios
    .request({
      url: `/api/${userId}/get-user-info`,
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
