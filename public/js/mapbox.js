/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1Ijoiamlhd2VueiIsImEiOiJjbTlkZGYwZm4wY285MmpvZDVucXdtbm5xIn0.ZYXY9nG0vvqtUqVO_RZ2Pg';

var map = new mapboxgl.Map({
    container:'map',
    style: 'mapbox://styles/jiawenz/cm9ddum5f009p01spg3wpena4'
});
