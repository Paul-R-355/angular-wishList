import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoVije } from './destino-viaje.model';

//ESTADO
export interface DestinosViajesState{
    items: DestinoVije[];
    loading: boolean;
    favorito: DestinoVije;
}

export const intializeDestinosViajesState = ()=>{
    return {
	    items: [],
	    loading: false,
	    favorito: null
    }
}

//ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down'
}

export class VoteUpAction implements Action {
	type = DestinosViajesActionTypes.VOTE_UP;
	constructor(public destino: DestinoVije) {}
  }
  
  export class VoteDownAction implements Action {
	type = DestinosViajesActionTypes.VOTE_DOWN;
	constructor(public destino: DestinoVije) {}
  }

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoVije) {}
}

export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoVije) {}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction;

//REDUCERS
export function reducerDestinosViajes(
	state:DestinosViajesState | undefined,
	action:DestinosViajesActions | Action
) : DestinosViajesState {
	switch (action.type) {
		case DestinosViajesActionTypes.NUEVO_DESTINO: {
		  return {
		  		...state!,
		  		items: [...state!.items, (action as NuevoDestinoAction).destino ]
		  	};
		}
		case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
			state!.items
			.forEach(
				(x) =>{
				 x.setSelected(false);
				});			
		    let fav:DestinoVije = (action as ElegidoFavoritoAction).destino;
		    fav.setSelected(true);
		    return {
		    	...state!,
		  		favorito: fav
		    };
		}
		case DestinosViajesActionTypes.VOTE_UP: {
			const d: DestinoVije = (action as VoteUpAction).destino;
			d.voteUp();
			return { ...state! };//clonando
		}
		case DestinosViajesActionTypes.VOTE_DOWN: {
			const d: DestinoVije = (action as VoteDownAction).destino;
			d.voteDown();
			return { ...state! };//clonando
		}
	}
	return state!;
}

//EFFECTS
@Injectable()
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
  	map((action:NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
  );

  constructor(private actions$: Actions) {}
}