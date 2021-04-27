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

    constructor(
        public nombre:string,
        public imagenUrl:string,
        public descripcion:string
        ){
    }

    isSelected():boolean{        
        return this.seleccionado;
    }

    setSelected(valor:boolean){
        this.seleccionado=valor;
    }

}