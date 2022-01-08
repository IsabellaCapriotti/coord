import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "src/service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate{

    constructor( private authService : AuthService, private router : Router ){}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        
        return await this.authService.loggedIn_guard(); 

    }
}