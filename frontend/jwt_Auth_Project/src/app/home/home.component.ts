import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emmiters';
import { async } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';

interface userRes {
  name:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  message : string = ''
  // TODO  fix message : CLEAR the message after user logout  

  constructor(
    private http : HttpClient,
    private authService : AuthServiceService
  ){}

  ngOnInit(): void {
    this.authService.getUser()
      .subscribe((res: any) => {
        this.message = `Hi ${res.user.name}`;
        Emitters.authEmitter.emit(true);
      }, (err) => {
        this.message = 'user not authorised';
        Emitters.authEmitter.emit(false);
      });
  }
}
