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
      //Si ya tengo url de imagen
      if(this.img.includes('https')) return this.img;

      //Si no tengo url de img
      if(this.img){
        return `${apiUrl}/upload/usuarios/${this.img}`;
      }
      return `${apiUrl}/upload/usuarios/noImg`;
  }
}
