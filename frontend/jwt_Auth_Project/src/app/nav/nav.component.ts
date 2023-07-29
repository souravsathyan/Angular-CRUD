import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Emitters } from '../emitters/emmiters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false

  constructor(private http : HttpClient, private router : Router){

  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean)=>{
      this.authenticated = auth
    })
  }

  logout(){
    this.http.post('http://localhost:8081/api/userLogout', {})
    .subscribe((res: any) => {
      localStorage.removeItem('token');
      this.router.navigate(['login'])
      Emitters.authEmitter.emit(false);
    })
  }
}
