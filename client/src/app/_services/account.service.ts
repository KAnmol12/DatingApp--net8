import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:44303/api/';
  private winAuthUrl = "https://localhost:44303/api/Account/AuthenticateByWinUsername";
  currentUser = signal<User | null>(null);

  loginByWinUser()
  {
    return this.http.get(this.winAuthUrl , {withCredentials: true});
  }

  // login(model: any): Observable<void> {
  //   return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
  //     map(user => {
  //       if (user && user.token) {
  //         localStorage.setItem('user', JSON.stringify(user));
  //         this.currentUser.set(user);
  //       }
        
  //     })
  //   );
  // }

  

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }
  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  // Function to get the token from localStorage
  getToken(): string | null {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    const user: User = JSON.parse(userString);
    return user.token;
  }
}


