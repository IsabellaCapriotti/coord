import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Subject, lastValueFrom } from "rxjs";
import { Router } from "@angular/router"; 

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuthenticated : boolean = false; 
    authSubj : Subject<boolean> = new Subject<boolean>(); 

    authUserID : string = ""; 
    sessionID : string = ""; 

    // Subject for checking session is valid every 10 minutes
    checkSessionSubj : Subject<boolean> = new Subject<boolean>(); 

    constructor( private http : HttpClient, private router : Router ){

        this.authUserID = this.get_coord_user_cookie(); 
        this.sessionID = this.get_session_id_cookie(); 

    }

    // Attempts to log in a user with the given username and password. If the attempt is successful, it will set the authentication 
    // state to true and set the user ID to the authenticated user. It returns the response from the server containing the result of the login attempt and the id of the matching user
    // found on a successful attempt. 
    async login(un : string, pw : string){

        let res:any = await lastValueFrom(this.http.post(environment.apiUrl + '/login', {'un':un, 'pw':pw})); 
        if(res['userState'] == 'valid'){
            this.isAuthenticated = true; 
            this.authUserID = res['userID']
            document.cookie = "coord_user=" + this.authUserID; 
        }
        else{
            this.isAuthenticated = false; 
            this.authUserID = ""; 
        }

        return res; 
    }

    // Attempts to log out the current user. After receiving a success message from the backend, it will set the authentication state
    // to false, and redirect back to the login page. 
    async logout(){

        let res:any = await lastValueFrom(this.http.post(environment.apiUrl + '/logout', {'userID': this.authUserID}, {responseType: 'text'})); 

        if(res == "success"){
            this.isAuthenticated = false; 
            this.router.navigate(['/login'])
        }
    }


    // Creates a new user with the passed information. Sets the class variable for user ID to the ID of the resulting new user, 
    // and updates the authentication state to true. Returns the response object from the server. 
    async create_user(un : string, pw : string, email : string){

        let res:any = await lastValueFrom(this.http.post(environment.apiUrl + '/create_user', {'un': un, 'pw': pw, 'email': email})); 

        if(res['userState'] == 'success'){
            this.isAuthenticated = true; 
            this.authUserID = res['userID'];  
            document.cookie = "coord_user=" + this.authUserID; 
        }
        else{
            this.isAuthenticated = false; 
            this.authUserID = ""; 
        }

        return res; 
    }



    // Checks to see if a given username exists
    check_un(un : string){
        return this.http.post(environment.apiUrl + '/un_available', {'un':un});
    }

    // Creates or regenerates a session ID for the currently authenticated user. Sets the session ID cookie to the result.
    async gen_session(){  

        // Return early if user is not authenticated
        let curr_user = this.get_coord_user_cookie(); 
        if(!this.isAuthenticated || curr_user == ""){
            return null; 
        }
        
        // Get new session ID
        let new_session_id = await lastValueFrom(this.http.post(environment.apiUrl + '/create_session', {'id': curr_user}, {
            'responseType': 'text'
        }));

        // Update
        this.sessionID = new_session_id; 
        document.cookie = "coord_session_id=" + this.sessionID; 
        return this.sessionID; 
    }

    // Utility function to retrieve the value of the coord_session_id cookie. 
    get_session_id_cookie(){

        let cookie_list = document.cookie.split(';')

        for(let i=0; i < cookie_list.length; i++){
            let curr = cookie_list[i].trim().split('='); 
            if(curr[0] == 'coord_session_id'){
                return curr[1] == "null" ? "" : curr[1]; 
            } 
        }

        return ""; 
    }

    // Utility function to retrieve the value of the coord_user cookie. 
    get_coord_user_cookie(){
        let cookie_list = document.cookie.split(';')

        for(let i=0; i < cookie_list.length; i++){
            let curr = cookie_list[i].trim().split('='); 
            if(curr[0] == 'coord_user'){
                return curr[1] == "null" ? "" : curr[1]; 
            } 
        }

        return ""; 
    }

    // Compares the value of the session_id token against the last valid session id for the current user as stored server-side. 
    // If the session is no longer valid, it will set the authentication state to false. 
    async check_session(){

        let curr_session_id = this.get_session_id_cookie();
        let curr_user_id = this.get_coord_user_cookie(); 

        if(curr_session_id == "" || curr_user_id == ""){
            return false; 
        }

        // Server-side check
        let server_res = await lastValueFrom(this.http.post(environment.apiUrl + '/check_session', {'id': curr_user_id, 'session_id': curr_session_id}, {
            responseType: 'text'
        }
        ));

        if(server_res == "true"){
            this.isAuthenticated = true; 
        }
        else{
            this.isAuthenticated = false; 
        }

        return server_res == "true" ? true : false; 
    }

    // Version of checking the session that returns a Boolean or URL tree for use in the guard for views. Returns true for a valid auth session, 
    // and a redirect to the login page otherwise
    async session_guard(){

        let curr_session_id = this.get_session_id_cookie();
        let curr_user_id = this.get_coord_user_cookie(); 

        if(curr_session_id == "" || curr_user_id == ""){
            return this.router.createUrlTree(['/login']); 
        }

        // Server-side check
        let server_res = await lastValueFrom(this.http.post(environment.apiUrl + '/check_session', {'id': curr_user_id, 'session_id': curr_session_id}, {
            responseType: 'text'
        }
        ));

        return server_res == "true" ? true : this.router.createUrlTree(['/login']); 
    }

    // Similar to the above function, but ensures that pages that should only be shown to unauthenticated users cannot be accessed if already 
    // signed in. 
    async loggedIn_guard(){

        let curr_session_id = this.get_session_id_cookie();
        let curr_user_id = this.get_coord_user_cookie(); 

        if(curr_session_id == "" || curr_user_id == ""){
            return true; 
        }

        // Server-side check
        let server_res = await lastValueFrom(this.http.post(environment.apiUrl + '/check_session', {'id': curr_user_id, 'session_id': curr_session_id}, {
            responseType: 'text'
        }
        ));

        return server_res == "false" ? true : this.router.createUrlTree(['/my-coords']); 
    }
   
}