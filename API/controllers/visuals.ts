/* GeoJSON data tomada de https://github.com/schweini/CR_distritos_geojson.git */
const fs = require('fs');
const polygons : any[] = [];
for(let i=1;i <= 7;++i)
  polygons.push(JSON.parse(fs.readFileSync(`controllers/polygons/${i}.geojson`)));

const D3Node = require('d3-node');
const d3  = D3Node.d3,
      d3n = new D3Node();

function visualMap(data:{lat:Number, long:Number}[]) : string {
  const colors = ['','blue','lime','red','orange','green','yellow','darkgreen'];
  const projection = d3.geoConicEqualArea()
    .rotate([0,50,0])
    .fitSize([800,616],{type:"FeatureCollection",features:polygons});
    
  const path = d3.geoPath().projection(projection);

  const svg = d3n.createSVG(800,800)
  svg.append('g')
      .attr('stroke','white')
      .attr('stroke-linejoin','round')
    .selectAll('path')
      .data(polygons)
      .join('path')
        .attr('fill',(d:any)=>colors[+d.properties.Codigo])
        .attr('d',path);
  return d3n.svgString();
}

export { visualMap };
