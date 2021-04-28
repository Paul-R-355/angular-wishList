import { DestinoVije } from '../models/destino-viaje.model';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';


@Injectable()
export class DestinosApiClient {
  
	destinos: DestinoVije[] = [];

  constructor(){

  }
  
	getById(id: String): DestinoVije {
		return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
	  }
	getAll(): DestinoVije[] {
		return this.destinos;
	}


}
