import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService} from '../service/login.service'
import { User } from '../user';
import { Router } from '@angular/router';
import {  
  CookieService  
} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMessage = 'Invalid Credentials';
  successMessage: string | undefined;
  invalidLogin = false;
  loginSuccess = false;
  user: User;
  @Output() onChanged = new EventEmitter<boolean>()


  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) { 
    this.loginService.getUser().subscribe((data: any) => {
      console.log(data);
      this.user = data;
    }, () => {
    });
    this.user = new User(-1, "Anon",[]);
  }

  ngOnInit(): void {
  }

  handleLogin() {
    this.loginService.login(this.username, this.password).subscribe((data: any) => {
      console.log(data);
      this.user = data;
      this.onChanged.emit(true);
      //this.registerSuccessfulLogin(this.cookieService.get('JSESSIONID'));
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful';
      //this.router.navigateByUrl('/calc');
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      this.onChanged.emit(false);
    })
  }

  registerSuccessfulLogin(cookie: string) {
    this.cookieService.set('JSESSIONID', cookie);
  }


}
