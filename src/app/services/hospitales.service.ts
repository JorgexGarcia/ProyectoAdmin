import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Hospital} from '../models/hospital.model';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient,
              private router: Router) { }

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
}
