import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
   personalinfoUrl = 'http://localhost:8080/user/pinfoData';
  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/user/signup', data);
  }
  // post the Data
  pinfoDatapost(data: any): Observable<any> {
    return this.http.post(this.personalinfoUrl, data);
  }
  formComplete(data: any): Observable<any> {
    return this.http.post("http://localhost:8080/user/complete", data);
  }
  pinfoDataupdate(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/user/pinfoData/:id', data);
  }
  pinfoDataGetFormData(data: any): Observable<any> {
    return this.http.get('http://localhost:8080/user/pinfoData/'+data);
  }
  pinfoDataget(): Observable<any> {
    return this.http.get(this.personalinfoUrl);
  }
  
  pinfoDatagetById(_id:any): Observable<any>{
    return this.http.get(`${this.personalinfoUrl}/${_id}`);
  }
  signin(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/user/login', data);
  }
  
  getAdmin(): Observable<any> {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return this.http.get('http://localhost:8080/user', {
      headers: headers,
    });
  }
}
