import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  onLogin(obj:any):Observable<any>{
    return  this.http.post('http://localhost:8081/api/userLogin', obj)
  }

  getUser():Observable<any>{
    return this.http.get('http://localhost:8081/api/user')
  }
}
