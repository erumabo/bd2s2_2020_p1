/* GeoJSON data tomada de https://github.com/schweini/CR_distritos_geojson.git */
const uglify = require("uglify-js");
const fs = require('fs');
const simplify = require('simplify-geojson')
const polygons:any = [];
for(let i=1;i < 8;++i)
  polygons.push(simplify(JSON.parse(fs.readFileSync(`controllers/polygons/${i}.geojson`)),0.001));

function visualMap(data:{lat:Number, long:Number,canton:string,guid:string}[]) : string {

  //Calcular Distancia euclidea de los puntos más apartes del array
  let diff = data.reduce((acc:any,datum:any)=>{
    acc[0] = acc[0]<datum.long?acc[0]:datum.long;
    acc[1] = acc[1]>datum.long?acc[1]:datum.long;
    acc[2] = acc[2]<datum.lat?acc[2]:datum.lat;
    acc[3] = acc[2]>datum.lat?acc[3]:datum.lat;
    return acc;
  },[100,-100,100,-100]);
  diff = Math.sqrt((diff[0]-diff[2])*(diff[0]-diff[2]) - (diff[1]-diff[3])*(diff[1]-diff[3]));
 /* routes = {
    "10200101": {
      type: "Feature",
      properties: { canton : "Canton 1" },
      geometry: {
        type: "LineString",
        coordinates: [[datum.long, datum.lat],[..],[..],[..]]
      }
    },
    "212111": {
      type: "Feature",
      properties: { canton : datum.canton },
      geometry: {
        type: "LineString",
        coordinates: [[datum.long, datum.lat],[---],[----],[..]]
      }
    },...
  }*/
  let routes = data.reduce((acc:any,datum:{lat:Number, long:Number,canton:string,guid:string})=>{
    if(acc[datum.guid]) acc[datum.guid].geometry.coordinates.push([datum.long, datum.lat])
    else acc[datum.guid] = {
      type: "Feature",
      properties: { canton : datum.canton },
      geometry: {
        type: "LineString",
        coordinates: [[datum.long, datum.lat]]
      }
    }
    return acc;
  },{})

  // Tranformar routes de objeto a array sin llaves
  routes =  Object.keys(routes).map(k=>routes[k])

  let ret :string|any = `
const height = 700, width = 800;
const polygons = ${JSON.stringify(polygons)}
      routes = ${JSON.stringify(routes)};
const projection = d3.geoConicEqualArea()
  .rotate([0,50,0])
  .fitExtent([[20,20],[(height-40),(width-40)]],{type: "FeatureCollection",features:${(routes.length>0&&diff>0.01)?'routes':'polygons'}});
const path = d3.geoPath().projection(projection);

const tooltip = d3.select('body')
  .append('div')
    .attr("class","tooltip")
    .style("opacity",0)
    .style("position",'absolute')

const svg = d3.select("#container")
    .style("width",''+width+'px')
    .style("height",''+height+'px')
  .append("svg")
    .attr("width",''+width)
    .attr("height",''+height)
    .attr("viewBox","0 0 "+height+" "+width)
svg.append('g')
    .attr('stroke','white')
    .attr('stroke-width','0.1')
    .attr('fill','lightblue')
    .attr('stroke-linejoin','round')
  .selectAll('path')
    .data(polygons)
    .join('path')
      .attr('d',path);

svg.append('g')
    .attr('fill','none')
    .attr('stroke','#00000020')
    .attr('stroke-linecap','butt')
    .attr('stroke-linejoin','miter')
  .selectAll('path')
    .data(routes)
    .join('path')
      .attr('stroke-width','4')
      .attr('class','ruta')
      .attr('d',path)
      .on('mouseover',function(d,i){
        tooltip.transition()
          .duration(200)
          .style('opacity',.9)
          .style("left", (event.pageX) + "px")     
          .style("top", (event.pageY - 28) + "px") 
        tooltip.html(i.properties.canton);
      })
      .on('mouseout',function(d,i){
        tooltip.transition()
          .duration(200)
          .style('opacity',0);
      })

svg.call(d3.zoom()
        .extent([[0,0],[height,width]])
        .scaleExtent([0.1,10])
        .on("zoom",zooming));

function zooming(event) {
  d3.selectAll('path').attr('transform',event.transform)
  d3.selectAll('.ruta').attr('stroke-width',4.0/event.transform.k)
}
  `
  ret = uglify.minify(ret,{mangle:{toplevel:true}});
  if(ret.error) {
    console.error(ret.error);
  }
  return ret.code;
}

function visualHeat(data:{_id:{canton:string,dia:number,hora:number},total:number}[]) {
  let maximo = -1;
  data.forEach(function(datum){
    if(datum.total>maximo) maximo = datum.total;
  })

  let ret :string|any = `
const data = ${JSON.stringify(data.map(datum=>{
    return {
      canton: datum._id.canton,
      dia: datum._id.dia-1,
      hora: datum._id.hora,
      total: datum.total
    }
  }))};

const height=620-80,width=700-80;
const x_range = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
     ,y_range = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
const maximo = ${maximo};

const svg = d3.select("#container")
    .style("width",''+width+'px')
    .style("height",''+height+'px')
  .append("svg")
    .attr("width",''+(width+80))
    .attr("height",''+(height+80))
    .attr("viewBox","0 0 "+700+" "+780)
  .append('g')
    .attr("transform",'translate(40,20)')

const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(x_range)
  .padding(0.01);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

const y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(y_range)
  .padding(0.01);
svg.append("g")
  .call(d3.axisLeft(y));

const myColor = d3.scaleLinear()
  .range(["white", "navy"])
    .domain([0,maximo])

svg.append('g')
  .selectAll('rect')
    .data(data)
    .join('rect')
      .attr('x',function(d){return x(x_range[d.dia])})
      .attr('y',function(d){return y(d.hora)})
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .attr('stroke','#00000040')
      .attr('fill',function(d){return myColor(d.total)})
  `;

  ret = uglify.minify(ret,{mangle:{toplevel:true}});
  if(ret.error) {
    console.error(ret.error);
  }
  return ret.code;
}

export { visualMap, visualHeat };
