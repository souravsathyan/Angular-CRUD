import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  editForm : FormGroup
  user:any
  displayModal = false
  @Output() updatedName = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthServiceService
    ) {}

  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required, Validators.email])
    })

    this.authService.getUser()
      .subscribe((res: any) => {
        this.user = res.user
        this.editForm.setValue({
          name:this.user.name,
          email:this.user.email
        })
      });
  }

  onSubmit(){
    const editForm = this.editForm.getRawValue()
    this.authService.editProfile(editForm)
    .subscribe((res)=>{
      if(res.updated){
        Swal.fire({
          title:'profile edited succesfully',
          icon:'success',
        })
      }else{
        Swal.fire({
          title:'error please try again',
          icon:'error',
        })
      }
      this.updatedName.emit(res.name)
    })
    
  }

  
  //TODO fix modal close after updating the profile

  showModal(){
    this.displayModal = true
  }
  
}
