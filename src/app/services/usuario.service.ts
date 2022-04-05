import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroForm} from '../interfaces/registroForm.interface';
import { LoginForm} from '../interfaces/loginForm.interfaces';
import { environment } from 'src/environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import {Usuario} from "../models/usuario.model";

const base_url = environment.BASE_URL;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario :Usuario ;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {

    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(){
    return this.usuario.uid || '';
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

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp:any) => {
        const { email, google, nombre, role, uid, img = ''} = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', google, img, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
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

  actualizarUsuario(data: {email:string, nombre:string, role:string}){

    data = { ...data ,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers:{
        'x-token': this.token
      }
    });

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
