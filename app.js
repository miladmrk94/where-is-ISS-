const map = L.map("issMap").setView([0, 0], 1);

let time = true;
const myIcon = L.icon({
  iconUrl: "./img/ISS.png",
  iconSize: [100, 80],
  iconAnchor: [25, 46],
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
let marker = L.marker([0, 0], { icon: myIcon }).addTo(map);

async function getData() {
  const iss = await axios
    .get("http://api.open-notify.org/iss-now.json")
    .then((res) => {
      return res.data.iss_position;
    });

  const { latitude, longitude } = iss;
  console.log(latitude, longitude);

  marker.setLatLng([latitude, longitude]);
  if (time) {
    map.setView([latitude, longitude], 3);
    time = false;
  }

  document.querySelector(
    ".h3-root"
  ).textContent = `Where is ISS:   lat:${latitude}   long:${longitude}`;
}

getData();

setInterval(getData, 1000);
