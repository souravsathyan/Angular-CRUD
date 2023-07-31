import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  
  admin = false
  title = 'jwt_Auth_Project';

  constructor(
    private authService : AuthServiceService,
    private activatedRoute:ActivatedRoute,
    private router : Router
  ){}
  
  ngOnInit(): void {
    this.authService.getAdminStatus().subscribe((status)=>{
      this.admin = status
      console.log(this.admin ,status, 'khjkjkbn')
    })
  }

  ngDoCheck(): void {
    // if(this.authService.checkUser() ){
    //   this.admin = true
    // }
    // console.log(this.admin)
  }

}
