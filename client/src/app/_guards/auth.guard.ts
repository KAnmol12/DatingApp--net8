import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);

    console.log('AuthGuard triggered');

    if (accountService.currentUser()) {
        return true; // User is authenticated
    } else {
        window.alert('You shall not pass!'); // Simple alert
        return false; // Deny access
    }
};
