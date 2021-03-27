//웹 보안은 매우 중요하며 가능하면 HTTPS를 사용하는 것이 좋습니다. 웹 보안을 강화하기위한 노력의 일환으로 모든 Maps JavaScript API를 HTTPS를 통해 사용할 수 있습니다??
const { google } = window;
let map;

function initMap() {
  const seoul = { lat: 37.5642135, lng: 127.0016985 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: seoul,
  });

  new google.maps.Marker({
    position: seoul,
    map: map,
  });
}
google.maps.event.addDomListener(window, "load", initMap);
