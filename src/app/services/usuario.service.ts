import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroForm} from '../interfaces/registroForm.interface';
import { LoginForm} from '../interfaces/loginForm.interfaces';
import { environment } from 'src/environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.BASE_URL;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { 

    this.googleInit();
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.GOOGLE_ID,
        cookiepolicy: 'single_host_origin',
      });
    });
  }

  logout(){
    this.auth2.signOut().then( () => {
      this.ngZone.run(()=>{
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      });
    });
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
