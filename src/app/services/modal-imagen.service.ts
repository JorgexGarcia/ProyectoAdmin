import {EventEmitter, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

const baseURL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  public imgCambio: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() { }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales',
             id: string,
             img: string = 'noImg'){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if(img.includes('https')){
      this.img = img;
    }else{
      this.img = `${baseURL}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal(){
    this._ocultarModal = true;
    this.tipo = null;
    this.id = null;
    this.img = null;
  }
}
