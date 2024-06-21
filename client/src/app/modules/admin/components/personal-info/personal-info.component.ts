import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserdataService } from 'src/app/services/userdata.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent implements OnInit {
  feedbackForm: any;
  countries: any;
  states: any;
  istate: any;
  message: any;
  personalDetails: any;
  pinfo: any ={};
  // countryLocal:any;
  // stateLocal:any;
  selectedCountry: any = {
    id: 0,
    name: '',
  };
  selectedState: any = {
    id: 0,
    name: '',
  };
  show: string = 'd-none';
  hide: string = 'd-none';
  user: any;
  abc: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private dataService: UserdataService,
    private auth: AuthService
  ) {
    if (localStorage.getItem('token')) {
      this.show = '';
    } else {
      this.hide = '';
    }
  }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      ffn: [
        ''
      ],
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z ]*$'),
        ]),
      ],
      midName: [
        ''
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z ]*$'),
        ]),
      ],
      countryPhoneCode: ['', Validators.required],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ]),
      ],
      countryName: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'
          ),
        ]),
      ],
      address1: ['', Validators.required],
      city: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
        ]),
      ],
      stateName: ['', Validators.required],
      postalcode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{6}$'),
        ]),
      ],
      airlineProgram: [''],
    });


    this.showAll(this.selectedCountry.id);
    this.getProfile();
    this.getFormData();
    // this.auth.pinfoDataget().subscribe(
    //   (resp)=>{
    //     if(resp) {
    //       console.log(resp,"sethu")
    //     }
    //   }
    // )
  }

  getFormData(){
    let id = sessionStorage.getItem('id');
    if(id!=null){
      this.auth.pinfoDataGetFormData(id).subscribe(
        (resp) => {
          if (resp) {
            this.showAll(resp.countryPhoneCode);
            this.pinfo = resp;
            console.log(this.pinfo)
          }
        },
        (err) => {
          
        }
      );
    }
  }

  getProfile() {
    this.auth.getAdmin().subscribe((res) => {
      if (res.succes) {
        this.user = res.data;
this.pinfo = res.data;
        if(this.user.formId != undefined && this.user.formId != null){
          sessionStorage.setItem('id', this.user.formId);
          this.getFormData();
        };
      }
    });
  }

  //countryPhoneCode, country, State DropDown
  showAll(country_id: any) {
    this.dataService.getCountries().subscribe((data: any) => {
      (this.countries = data.message)
        (this.states = data['message'].filter(
          (res: any) => res.country_id == country_id
        ));
      
      this.states.map((item: any) => {
        this.istate = item.states;
      });
    });
  }

  country(country_id: any) {
    let state = localStorage.getItem('state');
    let country = localStorage.getItem('country');
    (this.states = this.countries.filter(
      (res: any) => res.country_id == country_id
    ));
  this.states.map((item: any) => {
    this.istate = item.states;
    localStorage.setItem('country', JSON.stringify(this.countries));
    localStorage.setItem('state', JSON.stringify(this.istate));
    console.log(this.istate);
  });
  }
  redirect() {
    if (
      this.feedbackForm.value.firstName === '' ||
      this.feedbackForm.value.lastName === '' ||
      this.feedbackForm.value.countryPhoneCode === '' ||
      this.feedbackForm.value.phoneNumber === '' ||
      this.feedbackForm.value.countryName === '' ||
      this.feedbackForm.value.email === '' ||
      this.feedbackForm.value.address1 === '' ||
      this.feedbackForm.value.city === '' ||
      this.feedbackForm.value.stateName === '' ||
      this.feedbackForm.value.postalcode == ''
    ) {
      alert('All Fields Are required unless Noted');
    } else {
      const signupFormData = this.feedbackForm.value;
      // this.router.navigate(['/admin/comments']);
 
      let id = sessionStorage.getItem('id');
      if(id!=null){
        signupFormData._id = id;
      }
      this.auth.pinfoDatapost(signupFormData).subscribe(
        (resp) => {
          if (resp) {
            sessionStorage.setItem('id', resp._id);
            this.router.navigate(['/admin/comments']);
            // alert('Data added in Database');
          }
        },
        (err) => {
          alert('Form data not Posted');
        }
      );
    }
  }
  Back() {
    // this.router.navigate(['/admin/personalInfo']);
    this.location.back();
  }
}
