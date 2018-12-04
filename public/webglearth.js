var earth;

function initialize() {
    earth = new WE.map('earth_div');
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '© OpenStreetMap contributors'
    }).addTo(earth);

    earth.setView([48, 6], 5);
    //setTimeout(foo, 10000);
    //foo();
}

function foo() {

    pol0 = WE.polygon([[-69.2872321697549, 11.2956583022207],[-68.8453510163401, 10.0659632996469],[-70.8757657075917, 3.37227099999993],[-71.6665265170196, 3.37227099999993],[-69.2872321697549, 11.2956583022207]]  );
    pol0.addTo(earth);
    earth.update();
}
