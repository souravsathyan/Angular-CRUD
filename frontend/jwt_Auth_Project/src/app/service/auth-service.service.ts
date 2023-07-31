import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private adminSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http:HttpClient,
    ) { }

  onLogin(obj:any):Observable<any>{
    return  this.http.post('http://localhost:8081/api/userLogin', obj)
  }

  getUser():Observable<any>{
    return this.http.get('http://localhost:8081/api/user')
  }

  uploadPic(fileData:FormData):Observable<any>{
    return this.http.post('http://localhost:8081/api/uploadPic',fileData)
  }

  editProfile(userData:FormData):Observable<any>{
    return this.http.post('http://localhost:8081/api/updateProfile',userData)
  }

  
  checkUser(){
   const res =  localStorage.getItem('admin')
    if(localStorage.getItem('admin') !== 'true'){
      return false
    }else {
      return true
    }
  }

  setAdminStatus(status:boolean){
    this.adminSubject.next(status)
  }

  getAdminStatus():Observable<boolean>{
    return this.adminSubject.asObservable();
  }

  
}
