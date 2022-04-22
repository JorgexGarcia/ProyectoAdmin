import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../environments/environment";

const apiUrl = environment.BASE_URL;

@Pipe({
  name: 'img'
})

export class ImgPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if(!img){
      return `${apiUrl}/upload/${tipo}/noImg`;
    }else if(img.includes('https')){
      //Si ya tengo url de imagen
      return img;
    }else if(img){
      //Si no tengo url de img
      return `${apiUrl}/upload/${tipo}/${img}`;
    }else{
      return `${apiUrl}/upload/${tipo}/noImg`;
    }
  }

}
