import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] // Fixed typo here; it should be 'styleUrls'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private cookieService = inject(CookieService); // Injecting CookieService
  model: any = {};

  login() {
    this.accountService.loginByWinUser().subscribe((res: any) => {
      if (res) {
        // Store user and token in cookies
        this.cookieService.set('user',  res.username, 1); // Store user info in cookies for 7 days
        this.cookieService.set('token', res.token, 1); // Store token in cookies for 7 days
        this.accountService.currentUser.set(res);

        void this.router.navigateByUrl('/members');
      } else {
        alert("Unable to login");
      }
    });
  }

  logout() {
    this.accountService.logout();
    void this.router.navigateByUrl('/');
  }
}
