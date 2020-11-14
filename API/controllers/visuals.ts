/* GeoJSON data tomada de https://github.com/schweini/CR_distritos_geojson.git */
const fs = require('fs');
const polygons : any[] = [];
for(let i=1;i <= 7;++i)
  polygons.push(JSON.parse(fs.readFileSync(`controllers/polygons/${i}.geojson`)));

const D3Node = require('d3-node');
const d3  = D3Node.d3,
      d3n = new D3Node();

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

  const projection = d3.geoConicEqualArea()
    .rotate([0,50,0])
    .fitExtent([[20,20],[(800-40),(616-40)]],{type: "FeatureCollection",features:routes});
    
  const path = d3.geoPath().projection(projection);

  const svg = d3n.createSVG(800,800)
  svg.append('g')
      .attr('stroke','white')
      .attr('fill','lightblue')
      .attr('stroke-linejoin','round')
    .selectAll('path')
      .data(polygons)
      .join('path')
        .attr('d',path);

  svg.append('g')
      .attr('fill','none')
      .attr('stroke','black')
      .attr('stroke-width','4')
      .attr('stroke-linecap','round')
      .attr('stroke-linejoin','round')
    .selectAll('path')
      .data(routes)
      .join('path')
      .attr('d',path)
  return d3n.svgString();
}

export { visualMap };
