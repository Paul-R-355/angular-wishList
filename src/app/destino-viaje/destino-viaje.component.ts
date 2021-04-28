import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { DestinoVije } from '../models/destino-viaje.model';
//import * as EventEmitter from 'events'; esta no es la importacion correcta

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino!:DestinoVije;
  @Input('idx') posicion!:number;//nombrar a la variable
  //@Input() posicion!:number;
  @HostBinding('attr.class') cssClass= 'col-md-4'; //repara la caja extra de angular poniendo la nuestra
  @Output() clicked!:EventEmitter<DestinoVije>;//el tipo no es necesario pero es bueno agregr el tipoo

  constructor() {
    //inicializo la propiedad
    this.clicked = new EventEmitter();
   }

  ngOnInit(): void {
  }

  ir(){//
    this.clicked.emit(this.destino);//accion de desencadenamiento -- similar a un clic -- nos permitira disparar el evento emit(para que sepa que destino se clickeo)
    return false;//no recargue la pagina
  }

}
