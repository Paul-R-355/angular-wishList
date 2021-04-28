import { DestinoVije } from './destino-viaje.model';

export class DestinosApiClient {
    destinos: DestinoVije[];
    constructor() {
        this.destinos = [];
    }
    add(d: DestinoVije) {
        this.destinos.push(d);
    }
    /*
	getAll(){
	  return this.destinos;
    }*/

    getAll(): DestinoVije[] {
        return this.destinos;
    }
    
    getById(id: String): DestinoVije {
        return this.destinos.filter(function (d) { return d.id.toString() == id; })[0];
    }

}