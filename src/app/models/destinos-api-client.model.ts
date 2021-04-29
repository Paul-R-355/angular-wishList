import { DestinoVije } from './destino-viaje.model';

export class DestinosApiClient {
    
    destinos: DestinoVije[];

    constructor() {
        this.destinos = [];
    }

    add(destino: DestinoVije) {
        this.destinos.push(destino);
    }

    getAll(): DestinoVije[] {
        return this.destinos;
    }

    getById(id: String): DestinoVije {
        const destinoDeViaje= this.destinos.
        filter(
             (valorActualDestino)=> {
                 return valorActualDestino.id.toString() == id; //donde el id enviado sea igual al iterado retorna para la carga de la varible
                })[0];//recuperamos el destino de viaje como elemento solo y no como arreglo y asi lo retornamos en la funcion 
        return destinoDeViaje;
    }

}