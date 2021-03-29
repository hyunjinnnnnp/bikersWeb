import axios from "axios";

const userDetailMap = document.querySelector("#userDetailMap");
let map;
let userLocations;

const { google } = window;

const drawMarkers = () => {
  let lng;
  let lat;
  console.log(userLocations);
  //   userLocations.forEach((loc) => {
  //     lng = loc.mark.coordinates[0];
  //     lat = loc.mark.coordinates[1];
  //   });
  const marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: { lat, lng },
    map,
  });

  //coordinates: [lng, lat], : DATA
  //google
};
const initMap = () => {
  const seoul = { lat: 37.5642135, lng: 127.0016985 };
  map = new google.maps.Map(document.querySelector("#userDetailMap"), {
    zoom: 12,
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
      userLocations = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

if (userDetailMap) {
  google.maps.event.addDomListener(window, "load", initMap);
  init();
}
