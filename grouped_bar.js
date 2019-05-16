///////////////////BAR VARIABLES
var margin = {top: 20, right: 0, bottom: 20, left: 40},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .tickSize(0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(0)
    .orient("left");

var color = d3.scale.ordinal()
    .range(["#23637a","#d5d5d5"]);

var svg = d3.select('#vis-container').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




/////////////////MAP VARIABLES
var width_map = 600,
    height_map = 400;
// sets the type of view                                                                                                                                                                              
var projection = d3.geo.albersUsa()
    .scale(800) // size, bigger is bigger                                                                                                                                                            
    .translate([width_map / 2, height_map / 2]);

//creates a new geographic path generator                                                                                                                                                             
var path = d3.geo.path().projection(projection);
var xScale_map = d3.scale.linear()
    .domain([0, 7])
    .range([0, 500]);

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



var colorScale = d3.scale.linear()
    .domain([0, 2, 20])
    .range(['white', 'lightskyblue', '#23637a']);
//d3.scale.linear().domain([0,1,5,10,100])                                                                                                                                                            
//     .interpolate(d3.interpolateHcl)                                                                                                                                                                
//    .range([d3.rgb("FFFFFF"),d3.rgb("#FF6347"),d3.rgb("#f7f7f7"),d3.rgb("#67a9cf"),d3.rgb("0C00FF")]);//d3.rgb("#043927"), d3.rgb("#98f898")]);                                                     




/////////////////////DOT PLOT
var margin_dot = {top: 10, right: 25, bottom: 10, left: 400};

var width_dot = 1000 - margin_dot.left - margin_dot.right,
    height_dot = 200 - margin_dot.top - margin_dot.bottom;



var widthScale_dot = d3.scale.linear()
    .range([ 0, width_dot]);

var heightScale_dot = d3.scale.ordinal()
    .rangeRoundBands([ margin_dot.top, height_dot], 0.1);

var xAxis_dot = d3.svg.axis()
    .scale(widthScale_dot)
    .orient("bottom");

var yAxis_dot = d3.svg.axis()
    .scale(heightScale_dot)
    .orient("left")
    .innerTickSize([0]);




var fullwidth = 1000,
    fullheight = 200;
var svg_dot = d3.select("#dot")
    .append("svg")
    .attr("width", fullwidth)
    .attr("height", fullheight);




/////////////////////DOT PLOT 2
var margin_dot_2 = {top: 10, right: 25, bottom: 10, left: 600};

var width_dot_2 = 1000 - margin_dot_2.left - margin_dot_2.right,
    height_dot_2 = 300 - margin_dot_2.top - margin_dot_2.bottom;



var widthScale_dot_2 = d3.scale.linear()
    .range([ 0, width_dot_2]);

var heightScale_dot_2 = d3.scale.ordinal()
    .rangeRoundBands([ margin_dot_2.top, height_dot_2], 0.1);

var xAxis_dot_2 = d3.svg.axis()
    .scale(widthScale_dot_2)
    .orient("bottom");

var yAxis_dot_2 = d3.svg.axis()
    .scale(heightScale_dot_2)
    .orient("left")
    .innerTickSize([0]);




var fullwidth = 1000,
    fullheight = 300;
var svg_dot_2 = d3.select("#dot_2")
    .append("svg")
    .attr("width", fullwidth)
    .attr("height", fullheight);



d3.json("all_data.json", function(error, data) {

	bar_data = data[0];
	map_data = data[1];
	dot_data = data[2];
	dot_2_data = data[3];

	var brandNames = bar_data.map(function(d) { return d.brand; });
	var ageNames = bar_data[0].values.map(function(d) { return d.age; });
	var catNames = d3.set(bar_data[0].values.map(function(d) { return d.type; })).values();
	
		
	x0.domain(ageNames);
	
	x1.domain(catNames).rangeRoundBands([0, x0.rangeBand()]);



	//yAxisHandleForUpdate.append("text")
	//    .attr("transform", "rotate(-90)")
	//    .attr("y", 6)
	//    .attr("dy", ".71em")
	//    .style("text-anchor", "end")
	//    .text("Value");
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);
	    
	svg.append("g")
	    .attr("class", "y axis")
	    .style('opacity','0')
	    .call(yAxis);
	
	
	
	y.domain([0, d3.max([bar_data[0]], function(brand) { return d3.max(brand.values, function(d) { return d.val; }); })+0.1]);
	//y.domain([0, d3.max(dataSingle.values, function(d) { return d.val; })]);
	
	
	//.append("text")
	//.attr("transform", "rotate(-90)")
	//.attr("y", 6)
	//.attr("dy", ".71em")
	//.style("text-anchor", "end")
	//.style('font-weight','bold')
	//.text("Value");
	
	//svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
	

	var slice = svg.selectAll(".slice")
	    .data([bar_data[0]])
	    .enter()
	    .append("g")
	    .attr("class", "g");
	
	slice.selectAll("rect")
	    .data(function(d) {  return d.values; })
	    .enter().append("rect")
	    .attr("transform",function(d, i) {  return "translate(" + x0(d.age) + ",0)"; })
	    .attr("width", x1.rangeBand())
	    .attr("x", function(d) { return x1(d.type); })
	    .style("fill", function(d) { return color(d.type) })
	    .attr("y", function(d) { return y(0); })
	    .attr("height", function(d) { return height - y(0); })
	    .on("mouseover", function(d) {
		    d3.select(this).style("fill", d3.rgb(color(d.type)).darker(2));
		})
	    .on("mouseout", function(d) {
		    d3.select(this).style("fill", color(d.type));
		});
	
	slice.selectAll("text")
            .data(function(d) {  return d.values; })
            .enter().append("text")
	    .attr("transform",function(d, i) {  return "translate(" + x0(d.age) + ",0)"; })
	    .attr("x", function(d){  return x1(d.type);})
	    .attr("y", function(d){  return y(d.val*0.5);})
	    .attr("dx", "2em")
	    .attr("text-anchor", "end")
	    .text(function(d) { return ((d.val)*100).toFixed(0) + "%";})
	    .style("fill", "#000000")
	    ;


	slice.selectAll("rect")
	    .transition()
	    .delay(function (d) {return Math.random()*10;})
	    .duration(1000)
	    .attr("y", function(d) {  return y(d.val); })
	    .attr("height", function(d) { return height - y(d.val); });
	








	//////////////MAP
	d3.json("nielsentopo.json", function(error, dma) {
		var nielsen = dma.objects.nielsen_dma.geometries;
		var single = map_data[0];

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
                    .on("mouseover", function(d){
                            d3.select(this)
                                .attr("opacity", 1);
                            var prop = d.properties;
                            var string = "<p><strong>Market Area Name</strong>: " + prop.dma1 + "</p>";
                            string += "<p><strong>Percent of " +brandNames[0].slice(0, brandNames[0].indexOf('(')) + " customers</strong>: " + (prop.value).toFixed(0) + "% </p>";
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
                g_map.append("path", ".graticule")
                    .datum(topojson.mesh(dma, dma.objects.nielsen_dma, function(a, b) {
                                return true;
                            }))
                    .attr("id", "dma-borders")
                    .attr("d", path);
		
            
	
	
	// via http://stackoverflow.com/a/2901298                                                                                                                                                             
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	/////////////////////////DOTS
	//dot_data.sort(function(a, b) {
	//	return d3.descending(+a.year2015, +b.year2015);
	//    });

	// in this case, i know it's out of 100 because it's percents.
	widthScale_dot.domain([0., 0.9]);

	// js map: will make a new array out of all the d.name fields
	heightScale_dot.domain(dot_data[0].values.map(function(d) { return d.question; } ));


	// Make the faint lines from y labels to highest dot
	console.log(dot_data);
	var linesGrid = svg_dot.selectAll("lines.grid")
	    .data(dot_data[0].values)
	    .enter()
	    .append("line");

	linesGrid.attr("class", "grid")
	    .attr("x1", margin_dot.left)
	    .attr("y1", function(d) {
		    return heightScale_dot(d.question) + heightScale_dot.rangeBand()/2;
		})
	    .attr("x2", function(d) {
		    return margin_dot.left + widthScale_dot(+d.customer_score);

		})
	    .attr("y2", function(d) {
		    return heightScale_dot(d.question) + heightScale_dot.rangeBand()/2;
		});

	// Make the dotted lines between the dots
	var linesBetween = svg_dot.selectAll("lines.between")
	    .data(dot_data[0].values)
	    .enter()
	    .append("line");

	linesBetween.attr("class", "between")
	    .attr("x1", function(d) {
		    return margin_dot.left + widthScale_dot(+d.non_customer_score);
		})
	    .attr("y1", function(d) {
		    return heightScale_dot(d.question) + heightScale_dot.rangeBand()/2;
		})
	    .attr("x2", function(d) {
		    return margin_dot.left + widthScale_dot(d.customer_score);
		})
	    .attr("y2", function(d) {
		    return heightScale_dot(d.question) + heightScale_dot.rangeBand()/2;
		})
	    .attr("stroke-dasharray", "5,5")
	    .attr("stroke-width", function(d, i) {
		    return "0.5";
		});


	// Make the 
	var dots_non_customer = svg_dot.selectAll("circle.y1990")
	    .data(dot_data[0].values)
	    .enter()
	    .append("circle");

	dots_non_customer
	    .attr("class", "y1990")
	    .attr("cx", function(d) {
		    return margin_dot.left + widthScale_dot(+d.non_customer_score);
		})
	    .attr("r", heightScale_dot.rangeBand()/5)
	    .attr("cy", function(d) {
		    return heightScale_dot(d.question) + heightScale_dot.rangeBand()/2;
		})
	    .style("stroke", function(d){
		    if (d.name === "The World") {
			return "black";
		    }
		})
	    .style("fill", function(d){
		    if (d.name === "The World") {
			return "darkorange";
		    }
		})
	    .append("title")
	    .text(function(d) {
		    return d.question + " in 1990: " + d.non_customer_score + "%";
		});

	// Make the dots for 2015

	var dots_customer = svg_dot.selectAll("circle.y2015")
	    .data(dot_data[0].values)
	    .enter()
	    .append("circle");

	dots_customer
	    .attr("class", "y2015")
	    .attr("cx", function(d) {
		    return margin_dot.left + widthScale_dot(+d.customer_score);
		})
	    .attr("r", heightScale_dot.rangeBand()/5)
	    .attr("cy", function(d) {
		    return heightScale_dot(d.question) + heightScale_dot.rangeBand()/2;
		})
	    .style("stroke", function(d){
		    if (d.name === "The World") {
			return "black";
		    }
		})
	    .style("fill", function(d){
		    if (d.name === "The World") {
			return "#476BB2";
		    }
		})
	    .append("title")
	    .text(function(d) {
		    return d.question + " : " + d.customer_score + "%";
		});

	// add the axes

	svg_dot.append("g")
	    .attr("class", "x axis dot")
	    .attr("transform", "translate(" + margin_dot.left + "," + height + ")")
	    .attr("opacity", "0")
	    .call(xAxis_dot);

	svg_dot.append("g")
	    .attr("class", "y axis dot")
	    .attr("transform", "translate(" + margin_dot.left + ",0)")
	    .call(yAxis_dot);



	/////////////////////////DOTS 2
	//dot_data.sort(function(a, b) {
	//	return d3.descending(+a.year2015, +b.year2015);
	//    });

	// in this case, i know it's out of 100 because it's percents.
	widthScale_dot_2.domain([0., 0.9]);

	// js map: will make a new array out of all the d.name fields
	heightScale_dot_2.domain(dot_2_data[0].values.map(function(d) { return d.question; } ));


	// Make the faint lines from y labels to highest dot
	//console.log(dot_2_data);
	var linesGrid_2 = svg_dot_2.selectAll("lines.grid")
	    .data(dot_2_data[0].values)
	    .enter()
	    .append("line");

	linesGrid_2.attr("class", "grid")
	    .attr("x1", margin_dot_2.left)
	    .attr("y1", function(d) {
		    return heightScale_dot_2(d.question) + heightScale_dot_2.rangeBand()/2;
		})
	    .attr("x2", function(d) {
		    return margin_dot_2.left + widthScale_dot_2(+d.customer_score);

		})
	    .attr("y2", function(d) {
		    return heightScale_dot_2(d.question) + heightScale_dot_2.rangeBand()/2;
		});

	// Make the dotted lines between the dots
	var linesBetween_2 = svg_dot_2.selectAll("lines.between")
	    .data(dot_2_data[0].values)
	    .enter()
	    .append("line");

	linesBetween_2.attr("class", "between")
	    .attr("x1", function(d) {
		    return margin_dot_2.left + widthScale_dot_2(+d.non_customer_score);
		})
	    .attr("y1", function(d) {
		    return heightScale_dot_2(d.question) + heightScale_dot_2.rangeBand()/2;
		})
	    .attr("x2", function(d) {
		    return margin_dot_2.left + widthScale_dot_2(d.customer_score);
		})
	    .attr("y2", function(d) {
		    return heightScale_dot_2(d.question) + heightScale_dot_2.rangeBand()/2;
		})
	    .attr("stroke-dasharray", "5,5")
	    .attr("stroke-width", function(d, i) {
		    return "0.5";
		});


	// Make the 
	var dot_2s_non_customer = svg_dot_2.selectAll("circle.y1990")
	    .data(dot_2_data[0].values)
	    .enter()
	    .append("circle");

	dot_2s_non_customer
	    .attr("class", "y1990")
	    .attr("cx", function(d) {
		    return margin_dot_2.left + widthScale_dot_2(+d.non_customer_score);
		})
	    .attr("r", heightScale_dot_2.rangeBand()/5)
	    .attr("cy", function(d) {
		    return heightScale_dot_2(d.question) + heightScale_dot_2.rangeBand()/2;
		})
	    .style("stroke", function(d){
		    if (d.name === "The World") {
			return "black";
		    }
		})
	    .style("fill", function(d){
		    if (d.name === "The World") {
			return "darkorange";
		    }
		})
	    .append("title")
	    .text(function(d) {
		    return d.question + " in 1990: " + d.non_customer_score + "%";
		});

	// Make the dot_2s for 2015

	var dot_2s_customer = svg_dot_2.selectAll("circle.y2015")
	    .data(dot_2_data[0].values)
	    .enter()
	    .append("circle");

	dot_2s_customer
	    .attr("class", "y2015")
	    .attr("cx", function(d) {
		    return margin_dot_2.left + widthScale_dot_2(+d.customer_score);
		})
	    .attr("r", heightScale_dot_2.rangeBand()/5)
	    .attr("cy", function(d) {
		    return heightScale_dot_2(d.question) + heightScale_dot_2.rangeBand()/2;
		})
	    .style("stroke", function(d){
		    if (d.name === "The World") {
			return "black";
		    }
		})
	    .style("fill", function(d){
		    if (d.name === "The World") {
			return "#476BB2";
		    }
		})
	    .append("title")
	    .text(function(d) {
		    return d.question + " : " + d.customer_score + "%";
		});

	// add the axes

	svg_dot_2.append("g")
	    .attr("class", "x axis dot_2")
	    .attr("transform", "translate(" + margin_dot_2.left + "," + height + ")")
	    .attr("opacity", "0")
	    .call(xAxis_dot_2);

	svg_dot_2.append("g")
	    .attr("class", "y axis dot_2")
	    .attr("transform", "translate(" + margin_dot_2.left + ",0)")
	    .call(yAxis_dot_2);




	    //Legend

	var selector = d3.select("#drop")
	    .append("select")
	    .attr("id","dropdown")
	    .attr("onchange", "showData()")
	    .on("change", function(d){
		    selection = document.getElementById("dropdown");
		    y.domain([0, d3.max([bar_data[brandNames.indexOf(selection.value)]], function(brand){
				    return d3.max(brand.values, function(d) { return d.val; }); })]);


		   yAxis.scale(y);

		    var ddata = bar_data[brandNames.indexOf(selection.value)];
		    
		    slice.selectAll("rect")
		    .transition()
		    .delay(function (d) {return Math.random()*10;})
		    .duration(1000)
		    .attr("y", function(d, i) {  return y(ddata.values[i].val); })
		    .attr("height", function(d, i) { return height - y(ddata.values[i].val); });
		    
		    slice.selectAll("text")
		    .transition()
		    .duration(1000)
		    .attr("y", function(d, i){  return y(ddata.values[i].val*0.5);})
		    .text(function(d, i) { return ((ddata.values[i].val)*100).toFixed(0) + "%";});

		    
		    slice.selectAll("g.y.axis")
		    .transition()
		    .call(yAxis);


		    var mdata = map_data[brandNames.indexOf(selection.value)];

		    g_map.selectAll("path")
                    .data(topojson.feature(dma, dma.objects.nielsen_dma).features)
                    .on("mouseover", function(d){
                            d3.select(this)
                                .attr("opacity", 1);
			    
                            var prop = mdata.values[d.id];//d.properties;
                            var string = "<p><strong>Market Area Name</strong>: " + prop["Designated Market Area (DMA)"] + "</p>";
                            string += "<p><strong>Percent of " +selection.value.slice(0, selection.value.indexOf('(')) + " customers</strong>: " + (prop.value).toFixed(0) + "% </p>";
                            d3.select("#textbox")
                                .html("")
                                .append("text")
                                .html(string)
                                })
		    
                    .on("mouseout", function(d){
                            d3.select(this)})
		    .transition()
		    .duration(1000)
		    .attr("fill", function(d,i){
			    if (mdata.values[d.id]){
				return colorScale(mdata.values[d.id].value);
			    }
			    else{
				return colorScale(0);
			    }
                        });



		    var dot_plot_data = dot_data[brandNames.indexOf(selection.value)];

		    linesGrid.attr("class", "grid")
		    .attr("y1", function(d, i) {
			    console.log(i, dot_plot_data.values[i]);
			    return heightScale_dot(dot_plot_data.values[i].question) + heightScale_dot.rangeBand()/2;
			})
		    .attr("x2", function(d, i) {
			    return margin_dot.left + widthScale_dot(+dot_plot_data.values[i].customer_score);
			})
		    .attr("y2", function(d, i) {
			    return heightScale_dot(dot_plot_data.values[i].question) + heightScale_dot.rangeBand()/2;
			});



		    linesBetween.attr("class", "between")
		    .transition()
		    .duration(1000)
		    .attr("x1", function(d, i) {
			    return margin_dot.left + widthScale_dot(+dot_plot_data.values[i].non_customer_score);
			})
		    .attr("y1", function(d, i) {
			    return heightScale_dot(dot_plot_data.values[i].question) + heightScale_dot.rangeBand()/2;
			})
		    .attr("x2", function(d, i) {
			    return margin_dot.left + widthScale_dot(dot_plot_data.values[i].customer_score);
			})
		    .attr("y2", function(d) {
			    return heightScale_dot(d.question) + heightScale_dot.rangeBand()/2;
			});

		    dots_non_customer
		    .attr("class", "y1990")
		    .attr("cx", function(d, i) {
			    return margin_dot.left + widthScale_dot(+dot_plot_data.values[i].non_customer_score);
			})
		    .attr("cy", function(d, i) {
			    return heightScale_dot(dot_plot_data.values[i].question) + heightScale_dot.rangeBand()/2;
			});


		    dots_customer
		    .attr("class", "y2015")
		    .transition()
		    .duration(1000)
		    .attr("cx", function(d, i) {
			    return margin_dot.left + widthScale_dot(+dot_plot_data.values[i].customer_score);
			})
		    .attr("cy", function(d, i) {
			    return heightScale_dot(dot_plot_data.values[i].question) + heightScale_dot.rangeBand()/2;
			});



		    ///////DOT 2
		    var dot_2_plot_data = dot_2_data[brandNames.indexOf(selection.value)];

		    linesGrid_2.attr("class", "grid")
		    .attr("y1", function(d, i) {
			    console.log(dot_2_plot_data.values);
			    return heightScale_dot_2(dot_2_plot_data.values[i].question) + heightScale_dot_2.rangeBand()/2;
			})
		    .attr("x2", function(d, i) {
			    return margin_dot_2.left + widthScale_dot_2(+dot_2_plot_data.values[i].customer_score);
			})
		    .attr("y2", function(d, i) {
			    return heightScale_dot_2(dot_2_plot_data.values[i].question) + heightScale_dot_2.rangeBand()/2;
			});



		    linesBetween_2.attr("class", "between")
		    .transition()
		    .duration(1000)
		    .attr("x1", function(d, i) {
			    return margin_dot_2.left + widthScale_dot_2(+dot_2_plot_data.values[i].non_customer_score);
			})
		    .attr("y1", function(d, i) {
			    return heightScale_dot_2(dot_2_plot_data.values[i].question) + heightScale_dot_2.rangeBand()/2;
			})
		    .attr("x2", function(d, i) {
			    return margin_dot_2.left + widthScale_dot_2(dot_2_plot_data.values[i].customer_score);
			})
		    .attr("y2", function(d) {
			    return heightScale_dot_2(d.question) + heightScale_dot_2.rangeBand()/2;
			});

		    dot_2s_non_customer
		    .attr("class", "y1990")
		    .attr("cx", function(d, i) {
			    return margin_dot_2.left + widthScale_dot_2(+dot_2_plot_data.values[i].non_customer_score);
			})
		    .attr("cy", function(d, i) {
			    return heightScale_dot_2(dot_2_plot_data.values[i].question) + heightScale_dot_2.rangeBand()/2;
			});


		    dot_2s_customer
		    .attr("class", "y2015")
		    .transition()
		    .duration(1000)
		    .attr("cx", function(d, i) {
			    return margin_dot_2.left + widthScale_dot_2(+dot_2_plot_data.values[i].customer_score);
			})
		    .attr("cy", function(d, i) {
			    return heightScale_dot_2(dot_2_plot_data.values[i].question) + heightScale_dot_2.rangeBand()/2;
			});




//
//
//		    d3.selectAll(".rectangle")
//		    .transition()
//		    .attr("height", function(d){
//			    return height - y(+d[selection.value]);
//			})
//		    .attr("x", function(d, i){
//			    return (width / data.length) * i ;
//			})
//		    .attr("y", function(d){
//			    return y(+d[selection.value]);
//			})
//		    .ease("linear")
//		    .select("title")
//		    .text(function(d){
//			    return d.State + " : " + d[selection.value];
//			});
//		    
		    

		});

	selector.selectAll("option")
	    .data(brandNames)
	    .enter().append("option")
	    .attr("value", function(d){
		    return d;
		})
	    .text(function(d){
		    return d;
		})


	var legend = svg.selectAll(".legend")
	    .data(catNames)
	    .enter().append("g")
	    .attr("class", "legend")
	    .attr("transform", function(d,i) { return "translate(0," + i * 20  + ")"; })
	    .style("opacity","0");
	
	legend.append("rect")
	    .attr("x", width - 18)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", function(d) { return color(d); });
	
	legend.append("text")
	    .attr("x", width - 24)
	    .attr("y", 9)
	    .attr("dy", ".35em")
	    .style("text-anchor", "end")
	    .text(function(d) {return d; });
	
	legend.transition().duration(500).delay(function(d,i){ return 500 + 100 * i; }).style("opacity","1");
    });
    });