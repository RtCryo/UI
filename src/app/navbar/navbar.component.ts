import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  imgLink: string = "/assets/img/logo.png";
  userName: string = "Anon";

  constructor() {
  }

  ngOnInit(): void {
  }

}
