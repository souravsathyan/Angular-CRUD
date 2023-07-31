import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private adminStatusSubject = new Subject();
  constructor(
    private http:HttpClient,
    ) { }

  onLogin(obj:any):Observable<any>{
    return  this.http.post('http://localhost:8080/api/userLogin', obj)
  }

  getUser():Observable<any>{
    return this.http.get('http://localhost:8080/api/user')
  }

  uploadPic(fileData:FormData):Observable<any>{
    return this.http.post('http://localhost:8080/api/uploadPic',fileData)
  }

  editProfile(userData:FormData):Observable<any>{
    return this.http.post('http://localhost:8080/api/updateProfile',userData)
  }

  getAllusers():Observable<any>{
    return this.http.get('http://localhost:8080/api/getAllUsers')
  }

  deleteUser(id:any):Observable<any>{
    return this.http.post('http://localhost:8080/api/deleteUser',{id})
  }
  

  
}
