const PresType = {"polygon":1, "marker":2};
Object.freeze(PresType);

function drawGeometry() {
    let wkt_string = document.getElementById('wktInput').value;
	wkt_string = wkt_string.replace(/ +(?= )/g,'');
	wkt_string = wkt_string.replace(/(\r\n|\n|\r)/gm, "");
    let geometry = wellknown.parse(wkt_string.trim());

    geoms.forEach(function(item, i, arr) {
        if (item[1] == PresType.polygon)
            item[0].destroy();
        else
            item[0].removeFrom(earth);
    });
    geoms = [];

    let geomArray = wkt2geoArray(geometry);
    geomArray.forEach(function(item, i, arr) {
        let gObj = item[0].addTo(earth);
        geoms.push([gObj, item[1]]);
    });
    if (geomArray.length > 0) {
        // let viewPoint = geomArray[0][0];
        // earth.setView(viewPoint, 5);
    }
}

function wkt2geoArray(geometry)
{
    let res = [];
    if (geometry.type === "Polygon") {
        res.push([wkt2Polygon(geometry), PresType.polygon]);
    } else if (geometry.type === "Point") {
        res.push([wkt2Point(geometry), PresType.marker]);
    } else if (geometry.type === "LineString") {
        res.push([wkt2Line(geometry), PresType.polygon]);
    } else if (geometry.type === "GeometryCollection") {
        geometry.geometries.forEach(function(item, i, arr) {
             res = res.concat(wkt2geoArray(item));
        });
    } else {
        alert("geometry type " + geometry.type + " not supported");
    }

    return res;
}

function wkt2Line(geometry) {
    let points_array = geometry.coordinates;
    points_array.forEach(function(item, i){
        let buf = item[0];
        item[0] = item[1];
        item[1] = buf;
    });
    let copy = points_array.slice();
    copy.reverse();

    let prevLat = copy[1][0];
    let prevLon = copy[1][1];
    let lastLat = copy[0][0];
    let lastLon = copy[0][1];
    let addLat = lastLat - (prevLat - lastLat)*0.000001;
    let addLon = lastLon - (prevLon - lastLon)*0.000001;
    let addPoint = [addLat, addLon];
    points_array.push(addPoint);
    points_array = points_array.concat(copy);
    let line = WE.polygon(points_array, {
        color: '#0412d6',
        opacity: 1,
        fillColor: '#ffffff',
        fillOpacity: 0,
        weight: 2
    });
    return line;
}

function wkt2Point(geometry) {
    let points_array = geometry.coordinates;
    return WE.marker([points_array[1], points_array[0]]);
}

function wkt2Polygon(geometry) {
    let points_array = geometry.coordinates[0];
    points_array.forEach(function(item, i){
        let buf = item[0];
        item[0] = item[1];
        item[1] = buf;
    });

    return pol = WE.polygon(points_array, {
        color: '#0412d6',
        opacity: 1,
        fillColor: '#0412d6',
        fillOpacity: 0.1,
        weight: 2
    });
}