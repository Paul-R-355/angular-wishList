import {v4 as uuid} from 'uuid';
/*
export class DestinoVije{
    nombre!:string;
    imagenUrl!:string;
    descripcion!:string;

    constructor(nomb:string,url:string,desc:string){

        this.nombre=nomb;
        this.imagenUrl=url;
        this.descripcion=desc;

    }
}
*/
export class DestinoVije{    

    private seleccionado!:boolean;
    public servicios!:string[];
    public id = uuid();//genera ids randomicos del tipo: 11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000    
    public votes = 0;

    constructor(
        public nombre:string,
        public imagenUrl:string,
        public descripcion:string
        ){
        this.servicios=["Hotel","Piletas","Restaurantes"];
    }

    isSelected():boolean{        
        return this.seleccionado;
    }

    setSelected(valor:boolean){
        this.seleccionado=valor;
    }

    voteUp(): any {
        this.votes++;
      }
      voteDown(): any {
        this.votes--;
      }

}