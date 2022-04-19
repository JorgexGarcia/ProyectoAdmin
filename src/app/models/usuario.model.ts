import {environment} from "../../environments/environment";

const apiUrl = environment.BASE_URL;

export class Usuario{

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public role?: string,
        public uid?: string
    ){}

  get imagenUrl():string{

      if(!this.img){
        return `${apiUrl}/upload/usuarios/noImg`;
      }else if(this.img.includes('https')){
        //Si ya tengo url de imagen
        return this.img;
      }else if(this.img){
        //Si no tengo url de img
        return `${apiUrl}/upload/usuarios/${this.img}`;
      }else{
        return `${apiUrl}/upload/usuarios/noImg`;
      }
  }
}
