import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  userForm!: FormGroup;
  roles = Role;
  resultMsg: String = "";

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
      this.loading = true;
      this.getAllUsers();
      this.userForm = this.formBuilder.group ({
        username: ['', [Validators.required, 
          Validators.pattern(
          '[A-Za-z0-9]*'
        ), Validators.minLength(2), Validators.maxLength(11)]],
        password: ['', [Validators.required, 
          Validators.pattern(
          '[A-Za-z0-9]*'
        ), Validators.minLength(3), Validators.maxLength(8)]],
        role: ['', Validators.required]
      })
      this.setDefaults();
  }

  onSubmit(){
    this.loading = true;
    this.userService.postNewUser(this.userForm.value).subscribe({
      next: (msg) => {
        this.resultMsg = msg.message;
        this.getAllUsers();
        setInterval(() => {this.resultMsg = "";}, 5000);
        this.loading = false;
      },
      error: (msg) => {
        this.resultMsg = msg;
        setInterval(() => {this.resultMsg = "";}, 5000);
        this.loading = false;
      }
    });
  }

  getRoles(): Array<string>{
    let roles = Object.keys(this.roles);
    return roles.slice(roles.length / 2);
  }

  setDefaults() {
    this.userForm.get("role")!.patchValue(this.getRoles()[0]);
  }

  getAllUsers(){
    this.userService.getAll().subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }
}
