///////////////////BAR VARIABLES
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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
    .range(["#92c5de","#d5d5d5","#0571b0"]);

var svg = d3.select('#vis-container').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




/////////////////MAP VARIABLES
var width_map = 960,
    height_map = 500;
// sets the type of view                                                                                                                                                                              
var projection = d3.geo.albersUsa()
    .scale(1070) // size, bigger is bigger                                                                                                                                                            
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
    .domain([0, 5, 50])
    .range(['white', 'lightskyblue', 'skyblue']);
//d3.scale.linear().domain([0,1,5,10,100])                                                                                                                                                            
//     .interpolate(d3.interpolateHcl)                                                                                                                                                                
//    .range([d3.rgb("FFFFFF"),d3.rgb("#FF6347"),d3.rgb("#f7f7f7"),d3.rgb("#67a9cf"),d3.rgb("0C00FF")]);//d3.rgb("#043927"), d3.rgb("#98f898")]);                                                     





d3.json("all_data.json", function(error, data) {
	console.log(data, error);
	bar_data = data[0];
	map_data = data[1];
	console.log(bar_data);
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
	    .data(function(d) { console.log('hi', d); return d.values; })
	    .enter().append("rect")
	    .attr("transform",function(d, i) { console.log(d, i); return "translate(" + x0(d.age) + ",0)"; })
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
            .data(function(d) { console.log('hi', d); return d.values; })
            .enter().append("text")
	    .attr("transform",function(d, i) { console.log(d, i); return "translate(" + x0(d.age) + ",0)"; })
	    .attr("x", function(d){ console.log('test', d); return x1(d.type);})
	    .attr("y", function(d){ console.log('test', d); return y(d.val*0.5);})
	    .attr("dx", "0.5em")
	    .attr("text-anchor", "right")
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
                    .on("mouseover", function(d){
                            d3.select(this)
                                .attr("opacity", 1);
                            var prop = d.properties;
                            var string = "<p><strong>Market Area Name</strong>: " + prop.dma1 + "</p>";
                            string += "<p><strong>Percent of XXX customers</strong>: " + (prop.value).toFixed(0) + "% </p>";
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
	







	    //Legend

	var selector = d3.select("#drop")
	    .append("select")
	    .attr("id","dropdown")
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
		    .attr("y", function(d, i) { console.log(d); return y(ddata.values[i].val); })
		    .attr("height", function(d, i) { return height - y(ddata.values[i].val); });
		    
		    slice.selectAll("text")
		    .transition()
		    .duration(1000)
		    .attr("y", function(d, i){ console.log('test', d); return y(ddata.values[i].val*0.5);})
		    .text(function(d, i) { return ((ddata.values[i].val)*100).toFixed(0) + "%";});


		    var mdata = map_data[brandNames.indexOf(selection.value)];
		    console.log(mdata);
		    g_map.selectAll("path")
                    .data(topojson.feature(dma, dma.objects.nielsen_dma).features)
		    .attr("fill", function(d,i){
			    console.log(d.id, mdata.values[d.id]);
			    if (mdata.values[d.id]){
				return colorScale(mdata.values[d.id].value);
			    }
			    else{
				return colorScale(0);
			    }
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
		    d3.selectAll("g.y.axis")
		    .transition()
		    .call(yAxis);

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
	    .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
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
	
	legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
    });
    });