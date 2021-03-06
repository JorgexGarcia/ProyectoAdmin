import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Hospital} from '../models/hospital.model';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  cargarHospitales(): Observable<Hospital[]>{

    const url = `${BASE_URL}/hospitales`;

    return this.http.get(url , this.headers)
      .pipe(
        map((resp: {ok: boolean, hospitales: Hospital[]} ) => resp.hospitales)
      );
  }

  crearHospital(nombre: string){

    const url = `${BASE_URL}/hospitales`;

    return this.http.post(url , {nombre}, this.headers);
  }

  actualizarHospital(nombre: string, id: string){

    const url = `${BASE_URL}/hospitales/${id}`;

    return this.http.put(url , {nombre}, this.headers);
  }

  eliminarHospital(id: string){

    const url = `${BASE_URL}/hospitales/${id}`;

    return this.http.delete(url , this.headers);
  }
}
