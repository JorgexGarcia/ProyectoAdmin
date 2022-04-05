import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

const base_Url = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class FileSubirService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' |'hospitales',
    id: string
  ){

    try{

      const url = `${base_Url}/upload/${tipo}/${id}`;

      //Para crear una Data
      const formData = new FormData();

      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method:'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if(data.ok){
        return data.nombreArchivo;
      }else{
        return false;
      }

    }catch (error){

      return false;
    }

  }

}
