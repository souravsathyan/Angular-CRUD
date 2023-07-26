import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emmiters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false

  constructor(private http : HttpClient){

  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean)=>{
      this.authenticated = auth
    })
  }

  logout(){
    this.http.post('http://localhost:8080/api/userLogout', {})
    .subscribe((res: any) => {
      localStorage.removeItem('token');
      Emitters.authEmitter.emit(false);
    })
  }
}
