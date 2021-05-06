import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoVije } from '../models/destino-viaje.model';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje.component';
import { DestinosApiClient } from '../models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.css']
})
export class ListaDestinoComponent implements OnInit {

  @Output() onItemAdded!: EventEmitter<DestinoVije>;
  updates:DestinoVije[];

  destinos!:DestinoVije[];  

  constructor(
    public destinosApiClient:DestinosApiClient
    ) {
    //this.destinos=[];
    this.onItemAdded = new EventEmitter();
    
    //suscripcion - llevaremos un array de los favoritos
    this.updates = [];
    this.destinosApiClient.subscribeOnChange(
      (dest:DestinoVije) => {//Calback
        if (dest != null) {//string de eventos - el primer valor es null por esto arrancamos desde el segundo valor
          this.updates.push(dest);
        }
      });

   }

  ngOnInit(): void {

  }
  //ya no lo usamos ahora usamos el agregado
  guardar(nombre:string,url:string,descripcion:string):boolean{//retorno boolean por ser el evento de un boton clic recarga la pagina hace submit

    //console.log(nombre);
    //this.destinos.push(new DestinoVije(nombre,url,descripcion))
    let detsinoUno=new DestinoVije(nombre,url,descripcion);
    this.destinosApiClient.add(detsinoUno);
    this.onItemAdded.emit(detsinoUno);
    //console.log(new DestinoVije(nombre,url));
    //console.log(this.destinos);

    return false //para que no recargue la pagina pues vinculamos el evento de un boton
  }

  agregado(detsinoUno:DestinoVije){//retorno boolean por ser el evento de un boton clic recarga la pagina hace submit

    //console.log(nombre);
    //this.destinos.push(new DestinoVije(nombre,url,descripcion))
    //let detsinoUno=new DestinoVije(nombre,url,descripcion);
    this.destinosApiClient.add(detsinoUno);
    this.onItemAdded.emit(detsinoUno);
    //console.log(new DestinoVije(nombre,url));
    //console.log(this.destinos);

    //return false //para que no recargue la pagina pues vinculamos el evento de un boton
  }

  /*
  elegido(dest:DestinoVije){
    //this.destinos.forEach(
    this.destinosApiClient.getAll().forEach(
      (valorActual)=>{
        valorActual.setSelected(false);
      });
    dest.setSelected(true);
  }*/

  //metodo con observable
  elegido(dest:DestinoVije){
    //this.destinos.forEach(
      this.destinosApiClient.elegir(dest);//metodo desde el api-Client
  }

}
