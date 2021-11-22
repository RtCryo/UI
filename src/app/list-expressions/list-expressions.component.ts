import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-list-expressions',
  templateUrl: './list-expressions.component.html',
  styleUrls: ['./list-expressions.component.css']
})
export class ListExpressionsComponent implements OnInit {

  loading = false;
  users!: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.loading = true;
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.loading = false;
          this.users = users;
      });
  }

}
