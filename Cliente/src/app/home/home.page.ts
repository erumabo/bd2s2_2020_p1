import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const apiURL :string = 'http://localhost:9000';
const endpoints = {
  loc :'/registerLocation',
  guid:'/generateGUID',
  pin :'/validatePin'
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  // form model
  pin:number;
  tiempo:number;
  guid:string;
  
  // interval id
  timer:any;
  countdown:number = 0; //iteraciones para enviar locacion

  //para efectos del ui
  minutos:number;
  segundos:number;

  constructor( 
    public alertController:AlertController,
    public geolocation:Geolocation
  ) {}

  setAlerta() {
    console.log(" :: ALERTA :: ",`${apiURL}${endpoints.guid}?pin=${+this.pin}&tiempo=${+this.tiempo}`);
    const req = new Request( `${apiURL}${endpoints.guid}?pin=${+this.pin}&tiempo=${+this.tiempo}`, {
      method: 'GET'
    });
    fetch(req).then(res=> {
      if(res.status==200) return res.json()
    }).then( data => {
        this.guid = data.guid;
        document.getElementById("set-card").style.display = "none";
        document.getElementById("timer-card").style.display = "block";
        this.minutos = +this.tiempo;
        this.segundos = 0;
        document.getElementById("timer").innerHTML = (''+this.minutos).padStart(2,'0')+':'+(''+this.segundos).padStart(2,'0')
        this.tiempo = this.minutos * 60 + this.segundos;
        console.log(`Alarma :: ${this.minutos}:${this.segundos}`);
        this.timer = setInterval(this.intervalHandle,1000,this);
        setTimeout(this.timeoutHandle,this.minutos*60*1000,this)
    }).catch(err=>{
      console.log(err);
      this.alertController.create({
        header: 'Error',
        message: 'Ha ocurrido un error al comunicarse con el servidor\nPor favor intente más tarde',
        buttons: ['Aceptar']
      }).then(alt=>alt.present().catch(err=>console.error('Error con el alert',err)));
    });
  }

  intervalHandle(self:HomePage) {
    self.segundos--;
    if(self.segundos < 0) {
      self.segundos = 59;
      self.minutos--;
    }
    
    self.countdown++;
    if(self.countdown == 5) {
      self.geolocation.getCurrentPosition().then(loc=>self.locationSend(loc,self.guid))
        .catch((error) => console.error('Error getting location', error) );
      self.countdown = 0;
    }

    document.getElementById("timer").innerHTML = (''+self.minutos).padStart(2,'0')+':'+(''+self.segundos).padStart(2,'0')
    let tb = (<HTMLInputElement> document.getElementById("timerbar")); 
    tb.value =  ''+(self.tiempo - (self.minutos*60+self.segundos)) / self.tiempo; 
  }

  timeoutHandle(self:HomePage) {
    self.pin = undefined;
    clearInterval(self.timer);
    self.alertController.create({
      header:"Confirmar PIN",
      inputs:[{
        name: 'cpin',
        type: 'text',
        attributes : {
          required:true,
          pattern:"[0-9][0-9][0-9]"
        }
      }],
      buttons: [{
        text:"Confirmar",
        handler: (alertData)=>{
          console.log(alertData.cpin);
          const req = new Request( `${apiURL}${endpoints.pin}?guid=${self.guid}&pin=${+alertData.cpin}`, {
            method: 'GET',
          });
          fetch(req)
            .then(res=>{})
            .catch(err=>console.error(err))
            .finally(()=>{
              document.getElementById("set-card").style.display = "block";
              document.getElementById("timer-card").style.display = "none";
            });
        }
      }]
    }).then(alt => alt.present());
  }

  locationSend(loc:any, guid:string) {
    const req = new Request( `${apiURL}${endpoints.loc}?lat=${loc.coords.latitude}&long=${loc.coords.longitude}&guid=${guid}`, {
      method: 'POST'
    });
    fetch(req)
      .then(res=>{if(res.status==201) return res.json()})
      .then(data=>{ console.log(data) })
      .catch(err=>console.error(err));
  }
}
