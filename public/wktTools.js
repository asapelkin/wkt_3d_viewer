

function drawGeometry() {
    var wkt_string = document.getElementById('wktInput').value;
    var geometry = wellknown.parse(wkt_string.trim());

   // console.log(geometry);
   // return;
    geoms.forEach(function(item, i, arr) {
        item.destroy();
    });

    var geomArray = geometryToPolygonsArray(geometry);

    geomArray.forEach(function(item, i, arr) {
        var pol = WE.polygon(item, {
            color: '#0412d6',
            opacity: 1,
            fillColor: '#0412d6',
            fillOpacity: 0.1,
            weight: 2
        });
        var gObj = pol.addTo(earth);
        geoms.push(gObj);
    });
    if (geomArray.length > 0) {
        var viewPoint = geomArray[0][0];
        earth.setView(viewPoint, 5);
    }
}


function geometryToPolygonsArray(geometry)
{
    var res = [];
    if (geometry.type === "Polygon") {
        var points_array = geometry.coordinates[0];
        points_array.forEach(function(item, i){
            var buf = item[0];
            item[0] = item[1];
            item[1] = buf;
        });
        res.push(points_array);
        //return points_array;
    } else if (geometry.type === "GeometryCollection") {
        geometry.geometries.forEach(function(item, i, arr) {
             res = res.concat(geometryToPolygonsArray(item));
        });
    }
   // console.log(res);
    return res;
}