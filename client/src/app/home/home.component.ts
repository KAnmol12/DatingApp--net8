import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http =inject(HttpClient);

  constructor(
    private cookieService: CookieService,
    private accountService: AccountService,
    private router: Router,
  )
  {}
  registerMode = false;
  users:string  [] = [];
  allData : any [] = [];

  private tokenCheckSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.getUsers();

    // Start the token check polling mechanism every 20 seconds (50000 ms)
    this.tokenCheckSubscription = interval(50000).subscribe(() => {
      const currentToken = this.cookieService.get('token');
      if (currentToken)
      {
        if (this.isTokenExpired(currentToken)) {
          this.handleSessionExpiry();
        }
      }
      else {
        this.handleSessionExpiry();
      }
    });


  }

  isTokenExpired(token: string): boolean {
    try {
      // Decode the token to get its expiration time
      // const decoded: any = jwt_decode(token);
      // const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
 
       // Decode token
        const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp; // 'exp' field from the token
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
 
 
      // If the token has an expiration time (exp), compare it with the current time
        if (decodedToken.exp && expirationTime < currentTime )
        {
          return true;  // Token has expired
        }
      return false;   // Token is still valid
    }
    catch (error) {
      console.error('Error decoding token:', error);
      return true;    // Consider the token expired if decoding fails
    }
  }

  private handleSessionExpiry(): void {
    this.accountService.logout();
    void this.router.navigateByUrl('');
    alert('Session expired, please log in again.');
  }
 
registerToggle() {
  this.registerMode = !this.registerMode
}

cancelRegisterMode(event: boolean){
  this.registerMode = event;
}

getUsers() {
  this.http.get("https://localhost:44303/api/AnmolUser").subscribe({
    next: (response: any) => {
      // this.users = response;
      this.users = [];

      // this.users = response.map((user: {username : any;}) => user.username);
      this.users = response;
    },
    error: error => console.log(error),
    complete: () => console.log('Request has completed'),
  });
}

}
