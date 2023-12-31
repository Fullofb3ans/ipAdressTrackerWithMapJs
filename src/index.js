import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

import { validateIp } from "./helpers";

const btn = document.querySelector('.search-bar__btn');
const ipInput = document.querySelector('.search-bar__input');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getValue)
ipInput.addEventListener('keydown', handleKey)

function handleKey(e){
    if (e.key === 'Enter'){
        getValue();
    }
}

function getValue(){
   if (validateIp(ipInput.value)) {
   fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_c8fUEmhoppLnZjDOxcsGigrQnOWoI&ipAddress=${ipInput.value}`)
    .then(response => response.json())
    .then(printInfo)
}
}

function printInfo(data){
  console.log(data.location);

  ipInfo.innerText = data.ip;
  locationInfo.innerText =data.location.country + ' '+data.location.region;
  timezoneInfo.innerText = data.location.timezone;
  ispInfo.innerText = data.isp;

  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [5123255.574261211, 6715432.442397521],
      zoom: 8, 
    })
  });

  map.on('click', function(e){
    console.log(e.coordinate);
  })

};

  
