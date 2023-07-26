import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService:AuthServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    let user = this.form.getRawValue();
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter all the fields correctly',
        icon: 'error',
      });
    } else {
     this.authService.onLogin(user).subscribe(
        (res:any) => {
          localStorage.setItem('token',res.token)
          this.router.navigate(['/']);
        },
        (err) => {
          if (err.status === 400 && err.error?.message) {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Something went wrong',
              icon: 'error',
            });
          }
        }
      );
    }
  }
}