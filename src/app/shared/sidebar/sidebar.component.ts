import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItem: any[];

  constructor(private sidebarService: SidebarService,
              private userService: UsuarioService) { 
    this.menuItem = sidebarService.menu;
  }

  salir(){
    this.userService.logout();
  }

  ngOnInit(): void {
  }

}
