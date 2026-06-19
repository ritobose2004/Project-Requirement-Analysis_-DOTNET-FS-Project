import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Injectable, inject } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        if (this.authService.isLoggedIn()) {
            const userRole = localStorage.getItem('Role');
            if (route.data['roles'] && route.data['roles'].includes(userRole)) {
                return true;
            }

            return this.router.createUrlTree(['/error']);
        }
        return this.router.createUrlTree(['/login']);
    }
}