/* GeoJSON data tomada de https://github.com/schweini/CR_distritos_geojson.git */
const uglify = require("uglify-js");
const fs = require('fs');
const polygons : any[] = [];
for(let i=1;i <= 7;++i)
  polygons.push(JSON.parse(fs.readFileSync(`controllers/polygons/${i}.geojson`)));


function visualMap(data:{lat:Number, long:Number,canton:string,guid:string}[]) : string {
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
  routes =  Object.keys(routes).map(k=>routes[k])

  let ret :string|any = `
const height = 800, width = 620;
const polygons = ${JSON.stringify(polygons)}
      routes = ${JSON.stringify(routes)};
const projection = d3.geoConicEqualArea()
  .rotate([0,50,0])
  .fitExtent([[20,20],[(height-40),(width-40)]],{type: "FeatureCollection",features:(routes.length>0?routes:polygons)});
const path = d3.geoPath().projection(projection);

const svg = d3.select("#container")
    .style("width",''+width+'px')
    .style("height",''+height+'px')
  .append("svg")
    .attr("width",''+width)
    .attr("height",''+height)
    .attr("viewBox","0 0 "+height+" "+width)
svg.append('g')
    .attr('stroke','white')
    .attr('stroke-width','6')
    .attr('fill','lightblue')
    .attr('stroke-linejoin','round')
  .selectAll('path')
    .data(polygons)
    .join('path')
      .attr('d',path);

svg.append('g')
    .attr('fill','none')
    .attr('stroke','black')
    .attr('stroke-width','2')
    .attr('stroke-linecap','round')
    .attr('stroke-linejoin','round')
  .selectAll('path')
    .data(routes)
    .join('path')
    .attr('d',path)

svg.call(d3.zoom()
        .extent([[0,0],[height,width]])
        .scaleExtent([1,8])
        .on("zoom",zooming));

function zooming(event) {
  d3.selectAll('path').attr('transform',event.transform)
}
  `
  ret = uglify.minify(ret,{mangle:{toplevel:true}});
  if(ret.error) {
    console.error(ret.error);
  }
  return ret.code;
}

export { visualMap };
