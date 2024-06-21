import { Component , OnInit , Input } from '@angular/core';
// import {UserdataService} from './services/userdata.service'
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'AirlineTravelers';

  public users : {name : string ; email : string}[] = [];
  // constructor(private _userdataService: UserdataService){}
  
  ngOnInit():void {
    // this._userdataService.getUsers().subscribe(data => this.users = data);
    
  }

  }
  

