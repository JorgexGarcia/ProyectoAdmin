import { Component, OnInit } from '@angular/core';
import {HospitalesService} from "../../../services/hospitales.service";
import {Hospital} from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import {ModalImagenService} from '../../../services/modal-imagen.service';
import {delay} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {BusquedaService} from '../../../services/busqueda.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  public cambioImagen: Subscription;

  constructor(private service: HospitalesService,
              private busqueda: BusquedaService,
              private modalService: ModalImagenService) { }

  ngOnInit(): void {

    this.cargarHospitales();

    this.cambioImagen = this.modalService.imgCambio.pipe(
      delay(100)
    )
      .subscribe(_ => {
        this.cargarHospitales();
      })

  }

  buscar (termino:string){
    if(termino.length !== 0){
      this.busqueda.busqueda('hospitales', termino).subscribe(
        (resp : Hospital[]) => {
          this.hospitales = resp;
        })
    }else{
      this.cargarHospitales();
    }

  }

  cargarHospitales(){
    this.cargando = true;

    this.service.cargarHospitales()
      .subscribe(resp => {
        this.cargando = false;
        this.hospitales = resp;
      })
  }

  guardarCambio(hospital: Hospital) {
    this.service.actualizarHospital(hospital.nombre, hospital._id)
      .subscribe( _ => {
        Swal.fire( 'Actualizado', hospital.nombre, 'success');
      })
  }

  eliminar(hospital: Hospital) {
    this.service.eliminarHospital(hospital._id)
      .subscribe( _ => {
        this.cargarHospitales();
        Swal.fire( 'Borrando', hospital.nombre, 'success');
      })
  }

  async abrirSWal(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if(value.trim().length > 0){
      this.service.crearHospital(value)
        .subscribe( _ => {
          this.cargarHospitales();
          Swal.fire( 'Crear', 'Hospital creado', 'success');
        })
    }

  }

  abrirModal(hospital: Hospital) {
    this.modalService.abrirModal('hospitales', hospital._id, hospital.img);

  }
}
