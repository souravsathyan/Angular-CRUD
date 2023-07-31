import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { TokenInterceptor } from './service/token.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { AdminNavComponent } from './Admin/admin-nav/admin-nav.component';
import { RouterModule } from '@angular/router';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditUserComponent,
    DashboardComponent,
    UsersComponent,
    AdminNavComponent,
    AdminLoginComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor,
    multi:true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
