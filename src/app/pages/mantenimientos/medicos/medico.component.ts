import { Component, OnInit } from '@angular/core';
import {Medico} from '../../../models/medico.model';
import {MedicoService} from '../../../services/medico.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HospitalesService} from '../../../services/hospitales.service';
import {Hospital} from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medico: Medico;
  public hospitales: Hospital[] = [];
  public hospitalSelect: Hospital;
  public medicoSelect: Medico;
  public medicoForm: FormGroup;

  constructor(private servicio: MedicoService,
              private fb : FormBuilder,
              private servicioHospital: HospitalesService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(({id}) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe(
      hospital => {
        this.hospitalSelect = this.hospitales.find(h => h._id === hospital);
      }
    )


  }

  cargarHospitales(){

    this.servicioHospital.cargarHospitales()
      .subscribe(resp => {
        this.hospitales = resp;
      })
  }

  abrirModal() {

  }

  guardarMedico() {

    if(!this.medicoSelect){
      this.servicio.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire( 'Crear', 'Médico creado', 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        })
    }else{
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelect._id
      }
      this.servicio.actualizarMedico(data)
        .subscribe(_ => {
          Swal.fire( 'Actualizado', 'Médico actualizado', 'success');
        })
    }
  }

  cargarMedico(id: string) {

    if(id === 'nuevo') return;

    this.servicio.cargarUnMedico(id)
      .pipe(
        delay(100)
      )
      .subscribe(resp => {

        const {nombre, hospital: {_id}} = resp;
        this.medicoSelect = resp;
        this.medicoForm.setValue({nombre, hospital: _id});

      },_ => {
        this.router.navigateByUrl(`/dashboard/medicos`);
      })
  }
}
