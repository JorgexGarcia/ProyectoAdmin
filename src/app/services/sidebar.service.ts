import { Injectable } from '@angular/core';
import {UsuarioService} from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  constructor(private userService: UsuarioService) {
  }

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    if(this.menu.length === 0){
      this.userService.logout();
    }
  }
}
