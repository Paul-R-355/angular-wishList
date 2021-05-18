import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDestinoComponent } from './lista-destino/lista-destino.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinosViajesState, reducerDestinosViajes, intializeDestinosViajesState, DestinosViajesEffects } from './models/destinos-viajes-state.model';
import { ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

//añaden las rutas que iran en las varras de direcciones
const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',component:ListaDestinoComponent},
  {path: 'destino/:id', component: DestinoDetalleComponent }

];

//redux init
export interface AppState {
  destinos: DestinosViajesState;
};

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

let reducersInitialState = {
    destinos: intializeDestinosViajesState()
};
//fin redux init


@NgModule({
  imports: [RouterModule.forRoot(routes),//registramos rutas, vinculamos para que se registren rutas en el modulo
    FormsModule,//imports para creacion de formularios
    ReactiveFormsModule,//imports para creacion de formularios    
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState as any }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument()
  ],
  exports: [RouterModule,]
})
export class AppRoutingModule { }
