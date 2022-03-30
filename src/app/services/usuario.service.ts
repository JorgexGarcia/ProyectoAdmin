import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroForm} from '../interfaces/registroForm.interface';
import { LoginForm} from '../interfaces/loginForm.interfaces';
import { environment } from 'src/environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
              private router: Router) { }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean>{

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp:any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError (error  => of(false))
      );

  }

  crearUsuario(formData: RegistroForm){
    
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }

  loginUsuario(formData: LoginForm){
    
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }

  loginGoogle(token: string){
    
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }
}
