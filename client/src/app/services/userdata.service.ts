import { HttpClient, HttpErrorResponse, HttpResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class UserdataService {

  // url_:string = "http://localhost:3000/countryState/" ;

  // constructor(private _http:HttpClient){}

  // getCountries():any {
  //   return this._http.get<any>(`${this.url_}` ).pipe(catchError(this.errorhandler))
  // }
  // errorhandler(error:HttpErrorResponse){
  //   return throwError(error.message || 'Server Error');
  // }
  url_:string = "http://localhost:8080/user/countries" ;

  constructor(private _http:HttpClient){}

  getCountries():Observable<any> {
    return this._http.get<any>(`${this.url_}`).pipe(catchError(this.errorhandler))
  }
  // getStates(country_id:number):any {
  //   return this._http.get<any>(`${this.url_}` ).pipe(catchError(this.errorhandler))
  // }
  errorhandler(error:HttpErrorResponse){
    return throwError(error.message || 'Server Error');
  }
}



 
  

