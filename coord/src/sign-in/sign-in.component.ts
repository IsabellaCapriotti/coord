import { Component } from '@angular/core'; 
import { AuthService } from 'src/service/auth.service';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{

    curr_un : string = "";
    curr_pw : string = "";
    curr_email : string = ""; 

    new_user : boolean = false;

    constructor(private authService : AuthService){}

    onSignInBtnClick(){

        console.log(this.curr_un + " " + this.curr_pw); 

        this.authService.login(this.curr_un, this.curr_pw).toPromise().then( (res:any) => {
            
            // Handle user that doesn't exist
            if(res['userState'] == 'not_found'){
                this.new_user = true; 
            }
            else if(res['userState'] == 'valid'){
                this.authService.setAuthenticated(true); 
            }

        }); 

    }

    onCreateBtnClick(){

        // Create a new user in the database
        this.authService.create_user(this.curr_un, this.curr_pw, this.curr_email).toPromise().then( (res:any) => {
            console.log(res); 
            if(res['userState'] == 'success'){
                this.authService.setAuthenticated(true); 
            }
        }); 

    }

    validateUserInfo(){
        return this.curr_un != "" && this.curr_pw != "" && this.curr_email != ""
    }
}