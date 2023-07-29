import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emmiters';
import { Subscription, async } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';

interface userRes {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message: string = '';
  email = ''
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {

    this.authService.getUser().subscribe(
      (res: any) => {
        this.message = ` ${res.user.name}`;
        this.email = res.user.email
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        this.message = 'user not authorised';
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
