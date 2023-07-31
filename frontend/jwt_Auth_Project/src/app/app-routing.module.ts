import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard , isAdminLoggedIn, noToLogin} from './service/auth.guard';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { UsersComponent } from './Admin/users/users.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent,canActivate : [authGuard]
  },
  {
    path:'Home',component:HomeComponent,canActivate : [authGuard]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'profile', component:ProfileComponent, canActivate : [authGuard]
  },
  {
    path:'admin/dashboard', component:DashboardComponent, canActivate:[isAdminLoggedIn]
  },
  {
    path:'admin/login', component:AdminLoginComponent
  },
  {
    path:'admin/user', component:UsersComponent, canActivate:[isAdminLoggedIn]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
