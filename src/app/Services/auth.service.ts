import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId = new BehaviorSubject<string | null>(JSON.parse(localStorage.getItem('currentUser') || '{}').id);
  private userName =new BehaviorSubject<string |null>(JSON.parse(localStorage.getItem('currentUser') || '{}').name);
  baseURL: string ='https://imagefilter-be.azurewebsites.net';

  constructor(private http:HttpClient) { }
  public login(formData:FormGroup){
    return this.http.post<IUser>(`${this.baseURL}/api/AdminAuth/Login`,formData)
  }
  getUserId(): BehaviorSubject<string|null>{
    return this.userId;
  }
  getUserName(): BehaviorSubject<string|null>{
    return this.userName;
  }
  createUser(formData: any) {
    return this.http.post(`${this.baseURL}/api/AdminAuth/Register`, formData);
  }
  setUserId(id: string): void {
    this.userId.next(id);
    // this.userId = id;
  }
  setUserName(userName:string):void{
    this.userName.next(userName);
  }
}
