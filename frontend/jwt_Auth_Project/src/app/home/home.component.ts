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


  constructor(
    private http : HttpClient,
    private authService : AuthServiceService
  ){}

  ngOnInit(): void {
    this.authService.getUser()
      .subscribe((res: any) => {
        this.message = `Hi ${res}`;
        Emitters.authEmitter.emit(true);
      }, (err) => {
        this.message = 'user not authorised';
        Emitters.authEmitter.emit(false);
      });
  }
}
