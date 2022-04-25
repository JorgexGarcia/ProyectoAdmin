import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import {Usuario} from "../../models/usuario.model";
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  private _usuario: Usuario;

  get nombre(){
    return this._usuario.nombre;
  }

  get imgUrl(){
    return this._usuario.imagenUrl;
  }

  get email(){
    return this._usuario.email;
  }

  constructor(private router: Router,
              private userService: UsuarioService) {
    this._usuario = userService.usuario;
  }

  salir(){
    this.userService.logout();
  }

  buscar(termino: string) {
    if(termino.length === 0 ){
      return;
    }
    this.router.navigateByUrl(`/dashboard/busqueda/${termino}`);
  }
}
