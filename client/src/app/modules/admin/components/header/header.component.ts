import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  className = 'd-none';
  user:any;
  constructor(private router:Router,
    private auth:AuthService) { 
    if(localStorage.getItem('token')){
      this.className = '';

    }else{
      this.className = 'd-none';
    }
  }
  
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.auth.getAdmin()
           .subscribe(res => {
             if(res.succes) {
               this.user =  res.data; 
             }

           })
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear()
    this.router.navigate(['/admin/personalInfo']);
    window.location.reload()
  }
}
