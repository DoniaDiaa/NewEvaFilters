import { Injectable } from '@angular/core';
import { Email } from '../models/Email';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseURL: string ='https://imagefilter-be.azurewebsites.net';

constructor(private http:HttpClient) { }
sendmail(email: string, image: any) {
  console.log(email);
  let testtdaata:FormData = new FormData();
  console.log(testtdaata);
  testtdaata.append('image', image);
  testtdaata.append('to', email);
  console.log(testtdaata);
  return this.http.post(`${this.baseURL}/api/Email/SendMail`, testtdaata);

}

}
