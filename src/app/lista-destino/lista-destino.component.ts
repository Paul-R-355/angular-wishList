import { Component, OnInit } from '@angular/core';
import { DestinoVije } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.css']
})
export class ListaDestinoComponent implements OnInit {

  destinos!:DestinoVije[];

  constructor() {
    this.destinos=[];
   }

  ngOnInit(): void {

  }

  guardar(nombre:string,url:string):boolean{//retorno boolean por ser el evento de un boton clic recarga la pagina hace submit

    //console.log(nombre);
    this.destinos.push(new DestinoVije(nombre,url))
    //console.log(new DestinoVije(nombre,url));
    console.log(this.destinos);

    return false //para que no recargue la pagina pues vinculamos el evento de un boton
  }

}
