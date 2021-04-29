import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDestinoComponent } from './lista-destino/lista-destino.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//añaden las rutas que iran en las varras de direcciones
const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',component:ListaDestinoComponent},
  {path: 'destino/:id', component: DestinoDetalleComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),//registramos rutas, vinculamos para que se registren rutas en el modulo
    FormsModule,//imports para creacion de formularios
    ReactiveFormsModule,//imports para creacion de formularios
  ],
  exports: [RouterModule,]
})
export class AppRoutingModule { }
