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

d3.json("image_age_data.json", function(error, data) {
	console.log(data, error);
	var brandNames = data.map(function(d) { return d.brand; });
	var ageNames = data[0].values.map(function(d) { return d.age; });
	var catNames = d3.set(data[0].values.map(function(d) { return d.type; })).values();
	
		
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
	
	
	
	y.domain([0, d3.max([data[0]], function(brand) { return d3.max(brand.values, function(d) { return d.val; }); })+0.1]);
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
	    .data([data[0]])
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
	


	    //Legend

	var selector = d3.select("#drop")
	    .append("select")
	    .attr("id","dropdown")
	    .on("change", function(d){
		    selection = document.getElementById("dropdown");
		    y.domain([0, d3.max([data[brandNames.indexOf(selection.value)]], function(brand){
				    return d3.max(brand.values, function(d) { return d.val; }); })]);


		    yAxis.scale(y);
		    
		//var slice = svg.selectAll(".slice")
		//.data([data[brandNames.indexOf(selection.value)]])
		//.enter()
		//.append("g")
		//.attr("class", "g");
		//  
		//slice.selectAll("rect")
		//.data(function(d) { console.log('hi', d); return d.values; })
		//.enter().append("rect")
		//.attr("transform",function(d, i) { console.log(d, i); return "translate(" + x0(d.age) + ",0)"; })
		//.attr("width", x1.rangeBand())
		//.attr("x", function(d) { return x1(d.type); })
		//.style("fill", function(d) { return color(d.type) })
		//.attr("y", function(d) { return y(0); })
		//.attr("height", function(d) { return height - y(0); })
		//.on("mouseover", function(d) {
		//	    d3.select(this).style("fill", d3.rgb(color(d.type)).darker(2));
		//	})
		//.on("mouseout", function(d) {
		//	    d3.select(this).style("fill", color(d.type));
		//	});
		    var ddata = data[brandNames.indexOf(selection.value)];
		    console.log(ddata);
		    //slice.selectAll(".slice")
		    //.data([data[brandNames.indexOf(selection.value)]])
		    //.enter()
		    //.append("g")
		    //.attr("class", "g");
		    
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
