import { ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements DoCheck{

  constructor(private router : Router,private authService : AuthServiceService){}
  
  ngDoCheck(): void {
    
  }

  adminLogout(){
    localStorage.setItem('admin','false')
    Swal.fire({
      title:'logout successfull',
      icon:'success',
    }).then(()=>{
      this.router.navigateByUrl('')
    })
  }

}
