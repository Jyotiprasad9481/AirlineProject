import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  data:any = {}

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private location:Location,
    private http:HttpClient,
    private auth: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.getFormData();
  }

  getFormData(){
    let id = sessionStorage.getItem('id');
    if(id!=null){
      this.auth.pinfoDataGetFormData(id).subscribe(
        (resp) => {
          if (resp) {
            this.data = resp;
          }
        },
        (err) => {
          this.router.navigate(['/admin/personalInfo'])
        }
      );
    }
    else {
      this.router.navigate(['/admin/personalInfo'])
    }
  }

  redirect(){
    this.data.complete = true;

    this.auth.pinfoDatapost(this.data).subscribe(
        (resp) => {
          if (resp) {
            sessionStorage.setItem('id', resp._id);
            this.router.navigate(['/admin/confirmation']);
          }
        },
        (err) => {
        }
      );
  }
  
  Back(){
    this.location.back();
  }

}
