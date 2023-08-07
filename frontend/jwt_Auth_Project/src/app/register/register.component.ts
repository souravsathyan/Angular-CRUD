import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { passwordChecker } from '../custom/validatos';
import { AuthServiceService } from '../service/auth-service.service';
import { Store } from '@ngrx/store';
import { userRegistration } from '../store/user/user.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService,
    private store : Store
  ) {}

  ngOnInit(): void {
    this.form = this.fromBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordChecker('password', 'confirmPassword'),
      }
    );
  }

  submit() {
    let user = this.form.getRawValue();
    // this.authService.createUser(user).subscribe(
    //   () => this.router.navigate(['/login']),
    //   (err) => {
    //     if (err.status === 400 && err.error?.message) {
    //       Swal.fire({
    //         title: 'Error',
    //         text: err.error.message,
    //         icon: 'error',
    //       });
    //     } else {
    //       Swal.fire({
    //         title: 'Error',
    //         text: 'Something went wrong',
    //         icon: 'error',
    //       });
    //     }
    //   }
    // );
    if(this.form.valid){
      this.store.dispatch(userRegistration({userDetails:user}))
    }
  }
}
