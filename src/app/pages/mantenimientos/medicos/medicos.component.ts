import {Component, OnDestroy, OnInit} from '@angular/core';
import {MedicoService} from '../../../services/medico.service';
import {Subscription} from 'rxjs';
import {Medico} from '../../../models/medico.model';
import {ModalImagenService} from '../../../services/modal-imagen.service';
import {delay} from 'rxjs/operators';
import {BusquedaService} from '../../../services/busqueda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;

  public cambioImagen: Subscription;

  constructor( private servicio: MedicoService,
               private modalService: ModalImagenService,
               private busqueda: BusquedaService) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.cambioImagen = this.modalService.imgCambio.pipe(
      delay(100)
    )
      .subscribe(_ => {
        this.cargarMedicos();
      })
  }

  ngOnDestroy(): void {
    this.cambioImagen.unsubscribe();
  }

  cargarMedicos(){
    this.servicio.cargarMedicos()
      .subscribe(resp => {
        this.cargando = false;
        this.medicos = resp;
      });
  }

  abrirModal(m: Medico) {
    this.modalService.abrirModal('medicos', m._id, m.img);
  }

  buscar (termino:string){
    if(termino.length !== 0){
      this.busqueda.busqueda('medicos', termino).subscribe(
        (resp : Medico[]) => {
          this.medicos = resp;
        })
    }else{
      this.cargarMedicos();
    }

  }

  eliminar(m: Medico) {

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Borrar a ${m.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.eliminarMedico(m._id)
          .subscribe(_ => {
            Swal.fire('Usuario borrado',
              `${m.nombre} fue eliminado correctamente`,
              'success');
            this.cargarMedicos();
          });
      }
    })
  }
}
