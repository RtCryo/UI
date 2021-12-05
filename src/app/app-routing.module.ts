import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcComponent } from './calc/calc.component';
import { ListExpressionsComponent } from './list-expressions/list-expressions.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';

const appRoutes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {roles: [Role.Developer, Role.Admin, Role.Super_admin]} },
  { path: 'calc', component: CalcComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: ListExpressionsComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin, Role.Super_admin]} },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'calc' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
