import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  
  admin = false
  title = 'jwt_Auth_Project';
  adminStatus$!: Observable<any>;

  constructor(
    private authService : AuthServiceService,
    private activatedRoute:ActivatedRoute,
    private router : Router
  ){}
  
  ngOnInit(): void {
   
  }

  ngDoCheck(): void {
    const adminStatus = localStorage.getItem('admin');
    this.admin = adminStatus === 'true' ? true : false 
  }

}
