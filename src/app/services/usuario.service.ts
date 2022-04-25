import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroForm} from '../interfaces/registroForm.interface';
import { LoginForm} from '../interfaces/loginForm.interfaces';
import { environment } from 'src/environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import {Usuario} from "../models/usuario.model";
import {CargarUsuarios} from "../interfaces/cargarUsuarios.interfaces";

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

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
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
        localStorage.removeItem('menu');
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((resp:any) => {
        const { email, google, nombre, role, uid, img = ''} = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', google, img, role, uid);
        this.localStorage(resp);
        return true;
      }),
      catchError ( _  => of(false))
      );

  }

  private localStorage(resp: any) {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('menu', JSON.stringify(resp.menu));
  }

  crearUsuario(formData: RegistroForm){

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp:any) => {
          this.localStorage(resp);
        })
      );

  }

  actualizarUsuario(data: {email:string, nombre:string, role:string}){

    data= {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);

  }

  loginUsuario(formData: LoginForm){

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp:any) => {
          this.localStorage(resp);
        })
      );

  }

  loginGoogle(token: string){

    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp:any) => {
          this.localStorage(resp);
        })
      );

  }

  cargarUsuarios(desde: number = 0): Observable<CargarUsuarios>{

    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuarios>(url , this.headers)
      .pipe(
        map( resp => {
          const usuarios = resp.usuarios.map(user => new Usuario(
            user.nombre,
            user.email,
            '',
            user.google,
            user.img,
            user.role,
            user.uid
          ));
          return {
            total: resp.total,
            usuarios
          }
        })
      );

  }

  eliminarUsuario(id: string){

    const url = `${base_url}/usuarios/${id}`;

    return this.http.delete(url, this.headers);

  }

  guardarUsuario(data: Usuario){

    return this.http.put(`${base_url}/usuarios/${data.uid}`, data, this.headers);

  }
}
