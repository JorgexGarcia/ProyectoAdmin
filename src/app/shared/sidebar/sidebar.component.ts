import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import {Usuario} from "../../models/usuario.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  private _usuario: Usuario;

  get nombre(){
    return this._usuario.nombre;
  }

  get imgUrl(){
    return this._usuario.imagenUrl;
  }

  constructor(public sidebarService: SidebarService,
              private userService: UsuarioService) {
    this._usuario = userService.usuario;
  }

  salir(){
    this.userService.logout();
  }

  ngOnInit(): void {
  }

}
