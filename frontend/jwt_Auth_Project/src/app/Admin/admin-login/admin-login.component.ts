import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private router: Router, private authService : AuthServiceService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.form.valid) {
      if(this.form.value.email != 'admin@gmail.com' && this.form.value.password != '123'){
        Swal.fire({
          title:'Incorrect Email and password. Please try again!!',
          icon:'error',
        })
      }else if(this.form.value.email != 'admin@gmail.com'){
        Swal.fire({
          title:'Incorrect Email. Please try again!!',
          icon:'error',
        })
      }else if(this.form.value.password != '123'){
        Swal.fire({
          title:'Incorrect password. Please try again!!',
          icon:'error',
        })
      }else{
        Swal.fire({
          title:'Login success',
          icon:'success',
        })
        .then(()=>{
          localStorage.setItem('admin','true')
          this.authService.setAdminStatus(true)
          this.router.navigateByUrl('admin/dashboard')
        })
      }
    }
    // email = admin@gmail.com
    // pwd = 123
  }
}
