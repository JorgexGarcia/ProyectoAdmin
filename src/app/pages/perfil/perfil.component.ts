import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario.model";
import Swal from 'sweetalert2';
import {FileSubirService} from "../../services/file-subir.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileServ: FileSubirService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre,Validators.required],
      email: [this.usuario.email,[Validators.required, Validators.email]]
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe(resp =>{
        this.usuario.nombre = this.perfilForm.get('nombre').value;
        this.usuario.email = this.perfilForm.get('email').value;

        Swal.fire('Guardado', 'Cambios fueron guardados' , 'success');
      },error => {
        Swal.fire('Error', error.error.msg, 'error');
      })
  }


  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    //Para mostrar una imagen, primero crea un fileReader y luego lo transforma en una string base 64
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileServ.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Cambios fueron guardados' , 'success');
      }).catch( error => {
       Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }
}
