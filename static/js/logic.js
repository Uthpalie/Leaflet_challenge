// Get data from the JSON file

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (response) {

    let features = response.features;

    //Add the map object with options       
    let myMap = L.map("map", {
        center: [
            38.9637, 35.2433
        ],
        zoom: 3,
        
    });
    
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    
    //Loop through to get the location details. Define the color and depth criteria for each.

    for (let i=0; i<features.length; i++) {

        let color = "";//Specify the color based on the condition

        let quakePlace = features[i].properties.mag; // Define the magnitude of quake

        let quakeLocation = features[i].geometry.coordinates;// Define the Location

        let depth = features[i].geometry.coordinates[2]; // Define the depth


        if (depth > 90) {   // Conditionals for earthquake magnitude
            color = "#ea2c2c";
        }
        else if (depth > 70) {
            color = "#ea822c";
        }
        else if (depth > 50) {
            color = "#ee9c00";
        }
        else if (depth > 30) {
            color = "#eecc00";
        }
        else if (depth > 10) {
            color = "#d4ee00";
        }
        else if (depth > -10) {
            color = "#98ee00";
        };

        let quakeMarker = L.circle([quakeLocation[1], quakeLocation[0]], {
            color: "black",
            weight: 0.5,
            fillColor: color,
            fillOpacity: 1,
            radius: quakePlace * 25000,
        }).bindPopup("<h3>Place: " + features[i].properties.place + "</h3><hr><h3>Magnitude: " + features[i].properties.mag + "</h3><h3>Depth: " + depth + "</h3>").addTo(myMap);

    };
    
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend');
        let grades = [-10, 10, 30, 50, 70, 90];
        let colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"];
    // Loop through our intervals and generate a label with a colored square for each interval.
            for (let i = 0; i < grades.length; i++) {
                div.innerHTML += "<i style='background: "
                + colors[i]
                + "'></i> "
                + grades[i]
                + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
            } 
    
        return div;
    };

    legend.addTo(myMap);

});





    






