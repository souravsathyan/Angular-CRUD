import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { getUsers } from 'src/app/store/admin/admin.action';
import { getUserList } from 'src/app/store/admin/admin.selector';
import { userInputData } from 'src/app/store/user/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any = [];
  form:FormGroup

  constructor(
    private authService: AuthServiceService,
    private store : Store
    ) {}

  ngOnInit(): void {
    // this.authService.getAllusers().subscribe((res) => {
    //   this.users = res;
    // });
    this.store.dispatch(getUsers())
    this.store.select(getUserList).subscribe((res : userInputData)=>{
      this.users = res
    })

    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      email:new FormControl('', [Validators.email, Validators.required]),
      password : new FormControl('',[Validators.required])
    })
  }

  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(id).subscribe((res) => {
          if (res.success) {
            this.users = this.users.filter((user: any) => user._id !== id);
            Swal.fire({
              title: 'user deleted successfully',
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'server error please try again',
              icon: 'error',
            });
          }
        });
      } else {
        Swal.fire({
          title: 'Action cancelled',
          icon: 'info',
        });
      }
    });
  }

  submit(){
    const userData = this.form.value
    this.authService.createUser(userData)
    .subscribe((res)=>{
      Swal.fire({
        title:'User created succesfully',
        icon:'success'
      }).then(()=>{
        this.users.push(res.user)
      })
    })
  }

  

  filterResult(text:string){
    if(!text){
      this.authService.getAllusers().subscribe((res) => {
        this.users = res;
      });
    }else{
      this.users = this.users.filter((user:any)=>
      user.name.toLowerCase().includes(text.toLowerCase())
      )
    }
  }
  
}
