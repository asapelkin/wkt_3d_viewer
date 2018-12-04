

function drawGeometry() {
    var wkt_string = document.getElementById('wktInput').value;
    var geometry = wellknown.parse(wkt_string.trim());

    console.log(geometry);


     pol0 = WE.polygon(geometryToPolygonsArray(geometry));
     pol0.addTo(earth);
    // console.log(geometry);
}




function geometryToPolygonsArray(geometry)
{
    if (geometry.type === "Polygon")
    {
        var points_array = geometry.coordinates[0];
        console.log(points_array);

        points_array.forEach(function(item, i)
        {
            var buf = item[0];
            item[0] = item[1];
            item[1] = buf;
            // item[1] = item[0];
            // item[0] = buf;
        });
        console.log(points_array);

        return points_array;

    }
}