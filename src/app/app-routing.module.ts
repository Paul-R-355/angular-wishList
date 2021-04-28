import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDestinoComponent } from './lista-destino/lista-destino.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';

//añaden las rutas que iran en las varras de direcciones
const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',component:ListaDestinoComponent},
  {path:'destino',component:DestinoDetalleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//registramos rutas, vinculamos para que se registren rutas en el modulo
  exports: [RouterModule]
})
export class AppRoutingModule { }
