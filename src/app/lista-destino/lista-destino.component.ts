import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoVije } from '../models/destino-viaje.model';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje.component';
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { Store, State } from '@ngrx/store';
import { AppState } from '../app-routing.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.css']
})
export class ListaDestinoComponent implements OnInit {

  @Output() onItemAdded!: EventEmitter<DestinoVije>;
  //updates:DestinoVije[];
  updates:string[];

  destinos!:DestinoVije[];  

  constructor(
    public destinosApiClient:DestinosApiClient,
    public store: Store<AppState>
    ) {
    //this.destinos=[];
    //suscripcion - llevaremos un array de los favoritos
    this.onItemAdded = new EventEmitter();        
    this.updates = [];

    this.store.select(state => state.destinos)
      .subscribe(data => {
        let d = data.favorito;
        if (d != null) {
          this.updates.push("Se a eligido: " + d.nombre);
        }
      });


    /*this.destinosApiClient.subscribeOnChange(
      (dest:DestinoVije) => {//Calback
        if (dest != null) {//string de eventos - el primer valor es null por esto arrancamos desde el segundo valor
          this.updates.push(dest);
        }
      });*/

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
    this.store.dispatch( new NuevoDestinoAction(detsinoUno))
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
      this.store.dispatch(new ElegidoFavoritoAction(dest))
  }

}
