import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Emitters } from '../emitters/emmiters';
import { Subscription, async } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';
import { Store } from '@ngrx/store';
import { getUserName } from '../store/user/user.selector';


interface userRes {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit , AfterViewInit{
  message: string = '';
  email = ''
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private store : Store,
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('userDetails')
    if(storedUser){
      const userData = JSON.parse(storedUser)
      this.message = userData.name
      this.email = userData.email
    }else{
      this.message = "local storage error. Please check again"
    }
    // this.authService.getUser().subscribe(
    //   (res: any) => {
    //     this.message = ` ${res.user.name}`;
    //     this.email = res.user.email
    //     Emitters.authEmitter.emit(true);
    //   },
    //   (err) => {
    //     this.message = 'user not authorised';
    //     Emitters.authEmitter.emit(false);
    //   }
    // );
    
  }
  ngAfterViewInit(): void {
    Emitters.authEmitter.emit(true);
  }
}


// TODO BUG changing value after login. just login and see console for the error 