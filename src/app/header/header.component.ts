import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userID: string | null = null;
  userName:string| null = null;
  constructor(private auth :AuthService,private route:Router) { }
   isMenuCollapsed:boolean=true;
  ngOnInit(): void {
    this.auth.getUserId().subscribe({
      next: (nextUserId) => {
        this.userID = nextUserId;

      },
      complete: () => {
        console.log("Observable Died");
      }
    });
    this.auth.getUserName().subscribe({
      next:(nextUserName)=>{
        this.userName=nextUserName;
      },
      complete: () => {
        console.log("Observable Died");
      }
    })
  }
  LogOut(){
  localStorage.removeItem('currentUser');
  this.route.navigate(['/'])
  .then(() => {
    window.location.reload();
  });}
// AddNewAdmin(){
//   this.route.navigate(['/AddnewAdmin']);

// }

}



