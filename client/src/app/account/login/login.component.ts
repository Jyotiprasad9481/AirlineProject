import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  registerForm: any;
  className = 'd-none';
  message: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  onRegister() {
    const signupFormData = this.registerForm.value;
    delete signupFormData['cpassword'];
    this.auth.signup(signupFormData).subscribe(
      (resp) => {
        if (resp.success) {
          this.message = 'Account is successfully created';
          this.className = 'alert alert-success fw-bold text-center';
          this.registerForm.reset();
        } else {
          this.message = 'Email already exists';
          this.className = 'alert alert-danger fw-bold text-center';
        }
      },
      (err) => {
        alert(err);
      }
    );
  }

  onSubmit() {
    const data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    this.auth.signin(data).subscribe(
      (res) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['admin']);
        } else {
          this.message = res.message;
          this.className = 'alert alert-danger';
        }
      },
      (err) => {
        alert('login error');
      }
    );
  }
  ngOnInit(): void {
    const localtoken = localStorage.getItem('token');
    if (localtoken) {
      this.router.navigate(['admin']);
    }

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    (this.registerForm = this.fb.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ]),
      ],

      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[A-Za-z_0-9]{3,}@[A-za-z0-9]{3,}[.]{1}[A-Za-z.]{2,6}$'
          ),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$'
          ),
        ]),
      ],
      cpassword: ['', Validators.required],
    })),
      {
        validators: this.MustMatch('password', 'cpassword'),
      };
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
