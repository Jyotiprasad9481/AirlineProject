import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() {
    // if(!localStorage.getItem('user')){
    //   window.location.href = '/login';
    // }
   }

  ngOnInit(): void {
  }

}
