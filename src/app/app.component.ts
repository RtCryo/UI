import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'UI';
  invalidLogin: boolean = true;
  loginSuccess: boolean = false;

  constructor(){
  }

  onChanged(login: boolean) {
    if (login) {
      this.invalidLogin = false;
      this.loginSuccess = true;
    } else {
      this.invalidLogin = true;
      this.loginSuccess = false;
    }
  }

}
