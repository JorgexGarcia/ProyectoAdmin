import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Usuario} from "../models/usuario.model";
import {environment} from "../../environments/environment";
import {Hospital} from '../models/hospital.model';
import {Medico} from '../models/medico.model';

const base_url = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios (resultado: any[]): Usuario[]{
    return resultado.map( user => new Usuario(
        user.nombre,
        user.email,
        '',
        user.google,
        user.img,
        user.role,
        user.uid
      ));
  }

  busquedaTotal(termino: string) {
    const url = `${base_url}/todo/${termino}`;

    return this.http.get<any[]>(url , this.headers);

  }

  busqueda(tipo:'usuarios' | 'medicos' | 'hospitales',
           termino: string = ''){

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(url , this.headers)
      .pipe(
        map( (resp:any)  => {
          switch (tipo){
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);
            case 'hospitales':
              return this.transformarHospitales(resp.resultados);
            case 'medicos':
              return this.transformarMedicos(resp.resultados);
            default:
              return [];
          }
        })
      );

  }

  private transformarHospitales(resultados: Hospital[]): Hospital[] {
    return resultados;
  }

  private transformarMedicos(resultados: Medico[]): Medico[] {
    return resultados;
  }
}
