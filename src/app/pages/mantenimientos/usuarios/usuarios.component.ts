import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsuarioService} from "../../../services/usuario.service";
import {Usuario} from "../../../models/usuario.model";
import {BusquedaService} from "../../../services/busqueda.service";
import Swal from "sweetalert2";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  private _desde: number = 0;
  public cargando:boolean = true;

  public cambioImagen: Subscription;

  constructor(private service: UsuarioService,
              private busqueda: BusquedaService,
              private modalService: ModalImagenService) { }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.cambioImagen = this.modalService.imgCambio.pipe(
      delay(100)
      )
      .subscribe(_ => {
      this.cargarUsuarios();
    })

  }

  ngOnDestroy(): void {
    this.cambioImagen.unsubscribe();
  }

  private cargarUsuarios() {
    this.cargando = true;
    this.service.cargarUsuarios(this._desde)
      .subscribe(({total, usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number){
    this._desde += valor;

    if(this._desde < 0){
      this._desde = 0
    }else if( this._desde >= this.totalUsuarios){
      this._desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar (termino:string){
    if(termino.length !== 0){
      this.busqueda.busqueda('usuarios', termino).subscribe(
        (resp: Usuario[]) => {
          this.usuarios = resp;
        })
    }else{
      this.cargarUsuarios();
    }

  }

  eliminarUsuario( user: Usuario){

    if(user.uid === this.service.uid){
      return Swal.fire('Error','No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Borrar a ${user.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarUsuario(user.uid)
          .subscribe(_ => {
            Swal.fire('Usuario borrado',
              `${user.nombre} fue eliminado correctamente`,
              'success');
            this.cargarUsuarios();
          });
      }
    })
  }

  cambiarRole(item: Usuario) {
    this.service.guardarUsuario(item).subscribe(_ => {

    });
  }

  abrirModal(item: Usuario) {
    this.modalService.abrirModal('usuarios', item.uid, item.img);
  }

}
