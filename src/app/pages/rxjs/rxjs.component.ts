import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  private intervalSusb: Subscription; 

  constructor() { 

    this.retornObservable().pipe(
      retry()
    ).subscribe(
      valor => console.log('Subs', valor),
      error => console.warn('Error', error),
      () => console.info('Obs terminado')
    );

    this.intervalSusb = this.retornaIntervalo().subscribe( console.log );

  }
  ngOnDestroy(): void {
    this.intervalSusb.unsubscribe();
  }

  retornaIntervalo():Observable<number>{
    return interval(1000)
        .pipe(
          take(4),
          map(valor => valor + 1),
          filter(valor => (valor % 2 === 0)? true : false)
        );
  }


  retornObservable():Observable<number> {
    let i = -1;

    //Observables terminan con $
    return new Observable<number>(observer => {

      const intervalo = setInterval( () => {

        i++;
        observer.next(i);

        if( i === 5 ){
          clearInterval(intervalo);
          observer.complete();
        }

        if( i === 2 ){
          observer.error('i llego a dos');
        }

      },1000);

    });

  }


}
