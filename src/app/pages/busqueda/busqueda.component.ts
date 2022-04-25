import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Usuario} from '../../models/usuario.model';
import {Medico} from '../../models/medico.model';
import {Hospital} from '../../models/hospital.model';
import {BusquedaService} from '../../services/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activate: ActivatedRoute,
              private service: BusquedaService) { }

  ngOnInit(): void {

    this.activate.params.subscribe(({termino})=> {
        this.cargarDatos(termino);
    });
  }

  cargarDatos(termino: string){
    this.service.busquedaTotal(termino).subscribe((resp: any) =>{
        this.usuarios = resp.usuario;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
    });
  }
}
