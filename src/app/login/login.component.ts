import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private router:Router,private auth:AuthService) { }
  ngOnInit(): void {

  }
  loginform:FormGroup =this.fb.group({
    email:['', [Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })
  onlogin(){
    this.auth.login(this.loginform.value).subscribe({
      next: (response) => {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        console.log(response);
        this.auth.setUserId(response.data.id);
        this.auth.setUserName(response.data.firstName);
        this.router.navigate(['/test']);

      }
    })
  }

}
