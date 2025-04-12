/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1Ijoiamlhd2VueiIsImEiOiJjbTlkZGYwZm4wY285MmpvZDVucXdtbm5xIn0.ZYXY9nG0vvqtUqVO_RZ2Pg';

var map = new mapboxgl.Map({
    container:'map',
    style: 'mapbox://styles/jiawenz/cm9ddum5f009p01spg3wpena4',
    // center: [],
    // zoom: 10,
    // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
    // create a marker
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({ element: el, anchor: 'bottom'})
        .setLngLat(loc.coordinates)
        .addTo(map);

    bounds.extend(loc.coordinates);
    map.fitBounds(bounds, { top:200, bottom:200, left:100, right:100 });
});