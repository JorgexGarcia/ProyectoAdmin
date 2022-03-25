import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  //ejemplo de promesa, si se conecta a la api, la respuesta la transforma en json
  //me devuelve solo los datos. Como devuelve una promesa, en la llamada le ponemos un .then()
  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })
  }

  getUsuarios(){

    return new Promise (resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    })

  }

}
