import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Role } from '../_models/role';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loading = false;
  users!: User[];
  userForm: FormGroup;
  roles = Role;

  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required, 
        Validators.pattern(
        '[A-Za-z0-9]*'
      ), Validators.minLength(2), Validators.maxLength(11)]),
      userPassword: new FormControl('', [Validators.required, 
        Validators.pattern(
        '[A-Za-z0-9]*'
      ), Validators.minLength(3), Validators.maxLength(8)],),
      userRole: new FormControl(),
    })
   }

  ngOnInit() {
      this.loading = true;
      this.userService.getAll().subscribe(users => {
          this.loading = false;
          this.users = users;
      });
  }

  onSubmit(){
    console.log(this.userForm);
  }

  getRoles(): Array<string>{
    let roles = Object.keys(this.roles);
    return roles;
  }

}
