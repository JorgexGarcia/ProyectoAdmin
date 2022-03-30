import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  public titulo: string = '';
  public tituloSub: Subscription;

  constructor(private router: Router) { 
    this.tituloSub = this.getTitulo()
      .subscribe(({titulo}) => {
        this.titulo = titulo;
        document.title = `AdminPro - ${titulo}`;
      });
  }

  ngOnInit(): void {
  }

  getTitulo(){
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data)
    );
  }

}
