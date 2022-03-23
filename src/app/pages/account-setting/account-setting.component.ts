import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {

  private _linkTheme = document.querySelector('#theme');
  

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  changeTheme(theme: string){

    this.settingService.changeTheme(theme);

    this.settingService.checkCurrentTheme()

  }

}
