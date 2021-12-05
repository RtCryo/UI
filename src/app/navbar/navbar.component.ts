import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../_models/role';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  imgLink: string = "/assets/img/logo.png";
  userName: string = "Anon";
  currentUser!: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isAdmin(){
    return this.currentUser && ([Role.Admin, Role.Super_admin].indexOf(this.currentUser.role) > -1)
  }

  isDeveloper(){
    return this.currentUser && ([Role.Developer, Role.Admin, Role.Super_admin].indexOf(this.currentUser.role) > -1)
  }

}
