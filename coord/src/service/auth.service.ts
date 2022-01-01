import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    isAuthenticated : boolean = false; 
    authSubj : Subject<boolean> = new Subject<boolean>(); 

    constructor( private http : HttpClient ){}

    // Attempts to log in a user with the given username and password
    login(un : string, pw : string){

        return this.http.post(environment.apiUrl + '/login', {'un':un, 'pw':pw})
    }

    // Creates a new user with the passed information
    create_user(un : string, pw : string, email : string){

        return this.http.post(environment.apiUrl + '/create_user', {'un': un, 'pw': pw, 'email': email})
    }

    setAuthenticated(newVal : boolean){
        this.isAuthenticated = newVal; 
        this.authSubj.next(newVal); 
    }
}