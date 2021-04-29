import { Component, OnInit } from '@angular/core';
import { DestinoVije } from '../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from '../models/destinos-api-client.model';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css']
})
export class DestinoDetalleComponent implements OnInit {
  
  destino!:DestinoVije;

  constructor(
    private route: ActivatedRoute, 
    private destinosApiClient:DestinosApiClient) { }

  ngOnInit() {
	  let id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id!);
  }

}