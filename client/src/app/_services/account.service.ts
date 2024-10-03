import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  baseUrl = 'https://localhost:44303/api/';
  private winAuthUrl = "https://localhost:44303/api/Account/AuthenticateByWinUsername";
  currentUser = signal<User | null>(null);
  private tokenExpirationTimer: any;

  loginByWinUser() {
    return this.http.get(this.winAuthUrl, { withCredentials: true });
  }

  register(model: any): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.cookieService.set('user', JSON.stringify(user), 7); // Set cookie for 7 days
          this.currentUser.set(user);
          this.setAutoLogout(20 * 1000);  // Set auto-logout timer for 20 seconds
        }
        return user;
      })
    );
  }

  logout(): void {
    this.cookieService.delete('user');
    this.cookieService.delete('token');
    this.currentUser.set(null);

    // Clear the auto-logout timer if it exists
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;  // Clear the reference
    }
  }

  getToken(): string | null {
    const userString = this.cookieService.get('user');
    if (!userString) return null;
    const user: User = JSON.parse(userString);
    return user.token;
  }

  setAutoLogout(timeout: number): void {
    console.log(`Setting auto logout for ${timeout} ms`);
    this.tokenExpirationTimer = setTimeout(() => {
      console.log('Logging out due to timeout');
      this.logout();
      alert('Session expired, please log in again.'); // Notify user
    }, timeout);
  }
  
  getTokenExpirationDate(token: string): Date | null {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (!tokenPayload.exp) return null;

      const expirationDate = new Date(tokenPayload.exp * 1000); // 'exp' is in seconds
      console.log('Token expiration date:', expirationDate);
      return expirationDate;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }

  setCurrentUser(user: User): void {
    const tokenExpirationDate = this.getTokenExpirationDate(user.token);

    // Check if the token has expired
    if (tokenExpirationDate && tokenExpirationDate < new Date()) {
      this.logout();
      return; // Don't set an expired user
    }

    // Set current user and auto logout
    this.currentUser.set(user);
    const timeUntilExpiration = tokenExpirationDate ? tokenExpirationDate.getTime() - new Date().getTime() : 0;
    this.setAutoLogout(timeUntilExpiration); // Set auto-logout based on token expiration
  }
}
