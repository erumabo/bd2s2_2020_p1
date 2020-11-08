/* Ejemplo de Uso del Geoloc: 
 * -- import del modulo
 * import geolocation from './controllers/geolocation';
 * 
 * -- Llamada dentro de donde lo ocupe:
 * geolocation( lat , long ).then(canton=>{
 *   console.log(loc,canton) <-- promise callback
 * });
 */

import {Client, AddressType, Status} from "@googlemaps/google-maps-services-js";
import apikey from '../geoloc_token';

export default function geolocation( lat:number, long:number) : Promise<string>{
  const client = new Client({});
  return client.reverseGeocode({
    params : {
      latlng: `${lat},${long}`,
      result_type: [AddressType.administrative_area_level_2,AddressType.locality],
      key: apikey
    }
  }).then(res=>{
    if( res.data.status != Status.OK) throw new Error("Canton no encontrado");
    const locations: { administrative_area_level_2:string|undefined, locality:string|undefined } 
        = { administrative_area_level_2:undefined, locality:undefined };
    res.data.results.reduce((acc,curr)=>
        curr.address_components.reduce((a,c)=>{
          if(c.types.includes(AddressType.administrative_area_level_2))
             a.administrative_area_level_2 = c.long_name;
          if(c.types.includes(AddressType.locality))
             a.locality = c.long_name;
          return a;
        },acc)
      ,locations)
    if(locations.administrative_area_level_2) return locations.administrative_area_level_2;
    else if(locations.locality) return locations.locality;
    else throw new Error("Canton no encontrado");
  })
}
