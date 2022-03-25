import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {
          titulo: 'Main',
          url: '/'
        },
        {
          titulo: 'Gráficas',
          url: '/dashboard/grafica1'
        },
        {
          titulo: 'Promesas',
          url: '/dashboard/promesas'
        },
        {
          titulo: 'ProgressBar',
          url: '/dashboard/progress'
        },
        {
          titulo: 'Rxjs',
          url: '/dashboard/rxjs'
        },
      ]
    }
  ];

  constructor() { }
}
