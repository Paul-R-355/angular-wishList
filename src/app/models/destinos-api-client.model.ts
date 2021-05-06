import { DestinoVije } from './destino-viaje.model';
import { Subject, BehaviorSubject } from 'rxjs';

export class DestinosApiClient {
    
    destinos: DestinoVije[];
    //defino el observable
    current: Subject<DestinoVije | null> = new BehaviorSubject<DestinoVije | null> (null);//new DestinoVije("","","") este es el nuevo observable


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

    //publicamos al objeto current las nuevas versiones del destino actual que sera le favorito
    //esto ser un observable para obtener como favorito desde cuaquier parte de la aplicacion para el string en tiempo real asi tod la aplicacion sabra el favorito

    elegir(dest:DestinoVije){ 
        this.destinos.
        forEach(
            (x) =>{
             x.setSelected(false);
            });

        dest.setSelected(true);
	    this.current.next(dest); //seteamos el proximo valor al observable que empieza nullo y luego obtiene uno al lanzarce el evento
    }

    subscribeOnChange(fn:any){//metodo para que los demas se suscriban,(a las actualizaciones) asi los demas me manadan una  funcion para que se rigistre en el string de eventos del observable
    	this.current.subscribe(fn);
	}

}