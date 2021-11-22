import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcComponent } from './calc/calc.component';
import { ListExpressionsComponent } from './list-expressions/list-expressions.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'calc', component: CalcComponent },
  { path: 'admin', component: ListExpressionsComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: '/' },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
