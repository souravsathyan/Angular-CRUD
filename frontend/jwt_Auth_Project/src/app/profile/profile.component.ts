import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Emitters } from '../emitters/emmiters';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  file: File;
  showInput = false;
  uploadedImage: string = '';
  fileUrl: string = 'http://localhost:8081/images/';
  message = '';
  profileImg = '';
  email = '';

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (res: any) => {
        this.message = `Hi ${res.user.name}`;
        this.email = res.user.email;
        this.uploadedImage = this.fileUrl + res.user.image
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        this.message = 'user not authorised';
        Emitters.authEmitter.emit(false);
      }
    );
  }

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.currentTarget.files[0];
      console.log(file);
      if (
        (file.type == 'image/png' || file.type == 'image/jpeg') &&
        file.size < 60000
      ) {
        const formData = new FormData();
        formData.append('file', file);
        //TODO image upload backend
        this.authService.uploadPic(formData).subscribe((res: any) => {
          this.uploadedImage = this.fileUrl + res.imageUrl;
          this.toggleInput()
        }),
          (error: any) => {
            console.error('Error uploading image:', error);
          };
      } else {
        if (file.size > 60000) {
          alert('file should be less than 600 kb');
        }
        alert('please select jpeg or png files');
      }
    }
  }

  toggleInput() {
    return (this.showInput = !this.showInput);
  }
}
