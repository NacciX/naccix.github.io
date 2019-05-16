var width_map = 600,
    height_map = 500;
// sets the type of view
var projection = d3.geo.albersUsa()
    .scale(1070) // size, bigger is bigger
    .translate([width_map / 2, height_map / 2]);

//creates a new geographic path generator
var path = d3.geo.path().projection(projection);
var xScale_map = d3.scale.linear()
    .domain([0, 7])
    .range([0, 400]);

var xAxis_map = d3.svg.axis()
    .scale(xScale_map)
    .orient("bottom")
    .tickSize(13)
    .tickFormat(d3.format("0.0f"));


//set svg window
var svg_map = d3.select("#map")
    .append("svg")
    .attr("width", width_map)
    .attr("height", height_map);

var graticule = d3.geo.graticule()
    .extent([[-98 - 45, 38 - 45], [-98 + 45, 38 + 45]])
    .step([5, 5]);

// adding a blank background
svg_map.append("rect")
    .datum(graticule)
    .attr("class", "background")
    .attr("width", width_map)
    .attr("height", height_map);
// .on("click", clicked);

//declare g as our appended svg
var g_map = svg_map.append("g");

var defaultFill = "#aaa";



var colorScale = 
    d3.scale.linear()
    .domain([0, 1, 50])
    .range(['white', 'lightgreen', 'green']);
//d3.scale.linear().domain([0,1,5,10,100])
//     .interpolate(d3.interpolateHcl)
//    .range([d3.rgb("FFFFFF"),d3.rgb("#FF6347"),d3.rgb("#f7f7f7"),d3.rgb("#67a9cf"),d3.rgb("0C00FF")]);//d3.rgb("#043927"), d3.rgb("#98f898")]);



d3.json("nielsentopo.json", function(error, dma) {
	
	var nielsen = dma.objects.nielsen_dma.geometries;
	
	// adding data from tv json (number of TVs, etc) to map json
	d3.json("dma_data.json", function(error, data){
		var single = data[6];
		console.log(single.brand);
		var tv = single.values;
		for (var i = 0; i < nielsen.length; i++){
		    var dma_code = nielsen[i].id;
		    for (key in tv[dma_code]){
			nielsen[i].properties[key] = tv[dma_code][key];
		    }
		}
		dma.objects.nielsen_dma.geometries = nielsen;
		
		g_map.append("g")
		    .attr("id", "dmas")
		    .selectAll("path")
		    .data(topojson.feature(dma, dma.objects.nielsen_dma).features)
		    .enter()
		    .append("path")
		    .attr("d", path)
		    
		    //.on("click", clicked)
		    
		    .on("mouseover", function(d){
			    d3.select(this)
				.attr("opacity", 1);
			    //.attr("fill", "orange");
			    
			    var prop = d.properties;
			    var string = "<p><strong>Market Area Name</strong>: " + prop.dma1 + "</p>";
			    string += "<p><strong>Percent of XXX customers</strong>: " + (prop.value).toFixed(0) + "% </p>";
			    //string += "<p><strong>Nielsen Rank</strong>: " + prop.Rank + "</p>";
			    
			    d3.select("#textbox")
				.html("")
				.append("text")
				.html(string)
				})
		    
		    .on("mouseout", function(d){
			    d3.select(this)})
		    .attr("opacity", function(d,i){
			    return 1;})//d.properties["HEB Awareness"]*d.properties["HEB Awareness"];})
		    .attr("fill", function(d,i){
			    
			    return colorScale(d.properties.value); 
			});
		
		// add dma borders
		g_map.append("path", ".graticule")
		    .datum(topojson.mesh(dma, dma.objects.nielsen_dma, function(a, b) { 
				return true;
			    }))
		    .attr("id", "dma-borders")
		    .attr("d", path);	
		
	    })
	    });

// via http://stackoverflow.com/a/2901298
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

