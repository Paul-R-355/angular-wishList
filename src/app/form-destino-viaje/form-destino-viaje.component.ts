import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoVije } from '../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {

  @Output() onItemAdded!: EventEmitter<DestinoVije>;
  fg!: FormGroup;
  maxLongitudNombre: number = 10;
  searchResult: string[] = [];

  constructor(fb: FormBuilder) { //fb nos permite definir o construir el formulario
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({//pasamos un objeto de inicializacion que define estructur del formulario controles  vincular
      //nombre:  fb.control('',[Validators.required]),//control para vincular al tag html del nombre -> nombre: fb.control(''/*valor*/,[]/*validadores*/)
      nombre: fb.control('', Validators.compose([Validators.required, this.nombreValidador, Validators.maxLength(this.maxLongitudNombre)])),//
      url: fb.control('', []),
      descripcion: fb.control('', []),
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

  ngOnInit() {

    let elemNombre = <HTMLInputElement>document.getElementById('nombre');

    type KeyboardEventNames = 'keydown' | 'keyup'; //defino los nombres del evento de tipo teclear
    const eventNames: KeyboardEventNames[] = ['keydown', 'keyup']; //creo un camp del evento 

    fromEvent(elemNombre, 'input') //aqui pondremos el elemento y el evento - observable de evento de entrada
      .pipe(//hacemos el uso de operadores de rxjs para no usar solo un callback
        map((eventNames) => (eventNames.target as HTMLInputElement).value),//obtenemos el valor de la caden tecleada hasta esa precion de cada tecla .value
        filter(text => text.length > 2),//con mas de dos caracteres sigue el string
        debounceTime(120),//se detend dos decimas de segundo para saber si teclearn mas teclas
        distinctUntilChanged(),//permite ver el ultimo cambio en la cadena
        switchMap(() => ajax('/assets/datos.json'))//consultamos en este archivo para ver coincidencias
      ).subscribe((ajaxResponse) => {//no suscribimos al observble
        console.log(ajaxResponse.response);
        this.searchResult = ajaxResponse.response//cargamos a nuestra lista
          //filtramos client side solo para simplificar el ejemplo
          .filter(function (x: any) {
            return x.toLowerCase().includes(elemNombre.value.toLowerCase());
          });
      });

  }

  nombreValidador(control: FormControl): Object | null { //recive un control  en el que se implementa la validcion y devolvemos un objeto key y un valor boolean
    //{[s:string]:boolean}  //Object
    const longitud = control.value.toString().trim().length;
    if (longitud > 0 && longitud < 4) {
      return { 'invalidNombre': true }
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

//npm install --save @ngrx/store @ngrx/effects ->permite instalar






}