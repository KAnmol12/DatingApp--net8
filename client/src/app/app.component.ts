
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  private accountService = inject(AccountService);
  //title = 'DatingApp';

//usersList: any;
//usersList: any; 
// anmoluser: any;
// AnmolUsers: any;
//   usersList: any [] = [];
  
  //constructor(private httpClient: HttpClient){ }
  ngOnInit(): void {
    this.setCurrentUser();

    //this.getUsers();
    //this.http.get("https://localhost:44303/api/AnmolUser").subscribe( (res: any) => {

      // this.usersList = [];
      // this.usersList =res;
      // console.log(this.usersList);

      // next: response => this.users = response,
      
      // error: error => console.log(error),
      
      // complete: () => console.log('Request has completed')
  
 }

 setCurrentUser(){
  const userString = localStorage.getItem('user');
  if(!userString) return;
  const user = JSON.parse(userString);
  this.accountService.currentUser.set(user);

  
 }


}
