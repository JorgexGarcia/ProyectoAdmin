import { Component, OnInit } from '@angular/core';
import {ModalImagenService} from "../../services/modal-imagen.service";
import Swal from "sweetalert2";
import {FileSubirService} from "../../services/file-subir.service";

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any;

  constructor(public service: ModalImagenService,
              public fileServ: FileSubirService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.service.cerrarModal();
  }

  async cambiarImagen(file: File) {

    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = await(() => {
      this.imgTemp = reader.result;
    });

  }

  subirImagen() {

    const id = this.service.id;
    const tipo = this.service.tipo;

    this.fileServ.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Cambios fueron guardados' , 'success');
        this.service.imgCambio.emit(img);
        this.cerrarModal();
      }).catch( _ => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }


}
