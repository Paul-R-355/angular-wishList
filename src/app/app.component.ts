import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-wishList';
  
  time = new Observable (//definimos el observable time sera un observador de un string
    (observer)=>{ //el proximo evento a observar
      setInterval(//cunado se llama al metodo next (en acada 1 seg)
        ()=>{//callback 
          observer.next(new Date().toString());//guardamos la fecha
        },
        1000
      )
    }
  );
  
}
