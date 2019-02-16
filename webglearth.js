var earth;
var geoms = [];

function initialize() {
    earth = new WE.map('earth_div');
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '© OpenStreetMap contributors'
    }).addTo(earth);
    earth.setView([48, 6], 5);
}

