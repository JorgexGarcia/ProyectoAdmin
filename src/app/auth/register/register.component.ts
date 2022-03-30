import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent{

  public formSubmitted = false;

  public registroForm = this.fb.group({
    nombre: ['Jorge', [Validators.required, Validators.minLength(3)]],
    email: ['jorge@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    password2: ['123456', [Validators.required, Validators.minLength(6)]],
    terminos: [true, [Validators.required]]
  }, {
    validators: this.passwordIguales('password','password2')
  })

  constructor(private fb: FormBuilder,
              private userService: UsuarioService,
              private router: Router) { }

  crearUsuario(){
    this.formSubmitted = true;

    if(!this.registroForm.valid){
      return;
    }

    this.userService.crearUsuario(this.registroForm.value)
      .subscribe(resp => {
         //Ir a Inicio
         this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  }

  campoNoValido(valor: string):boolean {

    if(this.registroForm.get(valor).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registroForm.get('terminos').value && this.formSubmitted;
  }

  comprobarPassword(){
    const pass1 = this.registroForm.get('password').value;
    const pass2 = this.registroForm.get('password2').value;

    if(pass1 !== pass2 && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  passwordIguales(pass1:string, pass2:string){

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }

    }

  }

}
