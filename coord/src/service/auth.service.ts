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

    authUserID : string = ""; 
    sessionID : string = ""; 

    // Subject for checking session is valid every 10 minutes
    checkSessionSubj : Subject<boolean> = new Subject<boolean>(); 

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

    // Checks to see if a given username exists
    check_un(un : string){
        return this.http.post(environment.apiUrl + '/un_available', {'un':un});
    }

    // Creates a new session ID for the given user
    gen_session(){
        return this.http.post(environment.apiUrl + '/create_session', {'id': this.authUserID}, {
            'responseType': 'text'
        });
    }

    // Updates the ID of the currently authenticated user
    setAuthID(newID : string){
        this.authUserID = newID; 
    }

    // Updates the session ID for the current session
    setSessionID(newID : string){
        this.sessionID = newID; 
    }

    // Checks if the current user has a valid session active
    check_session(){
        console.log('checking session'); 
        this.http.post(environment.apiUrl + '/check_session', {'id': this.authUserID, 'session_id': this.sessionID}, {
            responseType: 'text'
        }).toPromise().then( (res:any) =>{
            console.log(res); 
        }); 
    }
}