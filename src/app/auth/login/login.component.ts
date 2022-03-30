import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

declare const gapi;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2:any ;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){

    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe( (resp) => {

        if(this.loginForm.get('remember').value) localStorage.setItem('email' , this.loginForm.get('email').value)
        else localStorage.removeItem('email')

        //Ir a Inicio
        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  startApp(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.GOOGLE_ID,
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token).subscribe( resp => {
              //Ir a Inicio
              this.router.navigateByUrl('/');
          });
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
