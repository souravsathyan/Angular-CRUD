import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      name: ['', Validators.required],
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
      this.http.post('http://localhost:8081/api/signUp', user).subscribe(
        () => this.router.navigate(['/login']),
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
