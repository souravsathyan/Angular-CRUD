import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any = [];
  form:FormGroup

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getAllusers().subscribe((res) => {
      this.users = res;
    });

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

  // onSearch(event:Event){
  //   const searchTerm = (event.target as HTMLInputElement).value;
  //   if(searchTerm === ''){
  //     this.authService.getAllusers().subscribe((res) => {
  //       this.users = res;
  //     });
  //   }else{
  //     this.users = this.users.filter((user : any) =>
  //       user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  //       console.log(this.users);
  //   }
  // }

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
