import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Emitters } from '../emitters/emmiters';
import { Store } from '@ngrx/store';
import { uploadPicture } from '../store/user/user.action';
import { getUserImage } from '../store/user/user.selector';
import { userModel } from '../store/user/user.model';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  file: File;
  showInput = false;
  uploadedImage: string = '';
  fileUrl: string = 'http://localhost:8080/images/';
  message = '';
  profileImg = '';
  email = '';

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private store : Store,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // this.authService.getUser().subscribe(
    //   (res: any) => {
    //     this.message = `Hi ${res.user.name}`;
    //     this.email = res.user.email;
    //     this.uploadedImage = this.fileUrl + res.user.image
    //     Emitters.authEmitter.emit(true);
    //   },
    //   (err) => {
    //     this.message = 'user not authorised';
    //     Emitters.authEmitter.emit(false);
    //   }
    // );
    const storedUser = localStorage.getItem('userDetails')
    if(storedUser){
      const userData = JSON.parse(storedUser)
      this.message = `Hi, ${userData.name}`
      this.email = userData.email
      this.uploadedImage = userData.image ? this.fileUrl + userData.image : 'No Image'
    }else{
      this.message = "local storage error. Please check again"
    }
  }

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.currentTarget.files[0];
      if (
        (file.type == 'image/png' || file.type == 'image/jpeg') &&
        file.size < 60000
      ) {
        const formData = new FormData();
        formData.append('file', file);
        // this.authService.uploadPic(formData).subscribe((res: any) => {
        //   this.uploadedImage = this.fileUrl + res.imageUrl;
        //   this.toggleInput()
        // }),
        //   (error: any) => {
        //     console.error('Error uploading image:', error);
        //   };
        this.store.dispatch(uploadPicture({userImage:formData}))
        this.store.select(getUserImage).subscribe((res)=>{
          console.log('in the component',res)
          this.uploadedImage = this.fileUrl + res ||''
        })
        this.toggleInput()
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

  onNameUpdated(updatedName:string){
    this.message = updatedName
  }
}
