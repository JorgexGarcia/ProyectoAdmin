import { Component, OnInit } from '@angular/core';
import {HospitalesService} from "../../../services/hospitales.service";
import {Hospital} from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  constructor(private service: HospitalesService) { }

  ngOnInit(): void {

    this.service.cargarHospitales().subscribe(resp => {
      console.log(resp);
    })
  }

}
