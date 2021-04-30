import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoVije } from '../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {

  @Output() onItemAdded!: EventEmitter<DestinoVije>;
  fg!: FormGroup;
  maxLongitudNombre:number=10;

  constructor(fb: FormBuilder) { //fb nos permite definir o construir el formulario
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({//pasamos un objeto de inicializacion que define estructur del formulario controles  vincular
      //nombre:  fb.control('',[Validators.required]),//control para vincular al tag html del nombre -> nombre: fb.control(''/*valor*/,[]/*validadores*/)
      nombre:  fb.control('',Validators.compose([Validators.required,this.nombreValidador,Validators.maxLength(this.maxLongitudNombre)])),//
      url:  fb.control('',[]),
      descripcion:  fb.control('',[]),
    });

    this.fg.valueChanges.subscribe(//registrar Observable para ver por consola todo cambio hecho en el formulario cada acceso de un caracter
      (form: any) => {
        console.log('form cambió:', form);
      }
    );

    this.fg.controls['nombre'].valueChanges.subscribe(
      (value: string) => {
        console.log('nombre cambió:', value);
      }
    );

  }

  guardar(nombre: string, url: string, descripcion: string): boolean {
    const detsinoUno = new DestinoVije(nombre, url, descripcion);
    this.onItemAdded.emit(detsinoUno);
    return false;
  }

  ngOnInit(): void {
  }

  nombreValidador(control:FormControl): Object | null{ //recive un control  en el que se implementa la validcion y devolvemos un objeto key y un valor boolean
    //{[s:string]:boolean}  //Object
    const longitud= control.value.toString().trim().length;
    if(longitud > 0 && longitud < 5){
      return {'invalidNombre':true}
    }
    return null;
  }
  //Funcion ejemplo para crear tu propio validador 
  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    (control: FormControl): Object | null => {
    //{ [key: string]: boolean }
    let l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
            return { 'minLongNombre': true };
        }
        return null;
    }
    return Object;
}








}