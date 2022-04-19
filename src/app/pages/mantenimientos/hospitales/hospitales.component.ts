import { Component, OnInit } from '@angular/core';
import {HospitalesService} from "../../../services/hospitales.service";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  constructor(private service: HospitalesService) { }

  ngOnInit(): void {

    this.service.cargarHospitales().subscribe(resp => {
      console.log(resp);
    })
  }

}
