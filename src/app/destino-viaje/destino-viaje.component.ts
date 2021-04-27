import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DestinoVije } from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino!:DestinoVije;
  @HostBinding('attr.class') cssClass= 'col-md-4'; //repara la caja extra de angular poniendo la nuestra

  constructor() { }

  ngOnInit(): void {
  }

}
