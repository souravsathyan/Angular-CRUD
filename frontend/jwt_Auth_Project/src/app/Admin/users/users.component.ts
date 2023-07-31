import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any = [];

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.getAllusers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
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
}
