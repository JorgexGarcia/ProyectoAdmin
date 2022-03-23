import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _defaultTheme = "./assets/css/colors/default-dark.css" ; 
  private _linkTheme = document.querySelector('#theme');

  constructor() { 

    let saveTheme = localStorage.getItem('theme') || this._defaultTheme;
    this._linkTheme.setAttribute('href', saveTheme);
  }

  changeTheme(theme: string){

    const url = `./assets/css/colors/${theme}.css`;

    this._linkTheme.setAttribute('href', url);

    localStorage.setItem('theme', url);

    this.checkCurrentTheme();

  }

  checkCurrentTheme(){
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach( elem => {

      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this._linkTheme.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }

    });

  }
}
