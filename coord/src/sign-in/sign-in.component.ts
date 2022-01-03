import { Component } from '@angular/core'; 
import { AuthService } from 'src/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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
    pw_error : boolean = false; 
    entry_error : boolean = false; 
    entry_error_msg : string = ""; 

    btn_active : boolean = false; 

    create_session : boolean = false; 

    constructor(private authService : AuthService, private spinner : NgxSpinnerService,
    private router : Router ){}

    onSignInBtnClick(){

        this.spinner.show('sign-in-spinner'); 
        this.authService.login(this.curr_un, this.curr_pw).toPromise().then( (res:any) => {
            
            // Handle user that doesn't exist
            if(res['userState'] == 'not_found'){
                this.new_user = true; 
            }
            else if(res['userState'] == 'valid'){
                
                // Create session
                this.authService.setAuthID(res['userID']); 


                this.authService.gen_session().toPromise().then( (res:any) => {
                    // console.log('session id: ' + res); 

                    this.authService.setSessionID(res); 
                    this.authService.setAuthenticated(true);

                    this.spinner.hide('sign-in-spinner'); 

                    this.router.navigate(['/my-coords']); 

                }); 
            }
            else if(res['userState'] == 'invalid'){
                this.new_user = false; 
                this.pw_error = true; 
                this.spinner.hide('sign-in-spinner'); 

            }


        }); 

    }

    onCreateBtnClick(){

        // Create a new user in the database        
        this.spinner.show('sign-in-spinner'); 

        this.authService.create_user(this.curr_un, this.curr_pw, this.curr_email).toPromise().then( (res:any) => {
            
            // Successful new user
            if(res['userState'] == 'success'){
                this.spinner.hide('sign-in-spinner'); 

                this.authService.setAuthenticated(true); 
                this.router.navigate(['/my-coords'])

            }
        }); 

    }

    switchToCreateMode(){
        this.new_user = true; 
        this.pw_error = false; 
    }

    validateUserInfo(){
        
        // Username check 
        let un_re = /^[a-z0-9_-]{3,}$/g;
        
        if(!un_re.test(this.curr_un)){
            this.entry_error = true; 
            this.entry_error_msg = "Please enter a username that is at least 3 characters long and contains only letters, numbers, and underscores."
            return false; 
        }

        // For new accounts, check if username isn't taken
        if(this.new_user){

            let isValid = this.authService.check_un(this.curr_un).toPromise().then( (res:any) => {
                if(res['userState'] == 'exists'){
                    this.entry_error = true; 
                    this.entry_error_msg = "That username already exists!"; 
                    return false; 
                }
                return true;
            });

            if(!isValid){
                return false; 
            }
        }

        // Password check 
        if(this.new_user){
            let pw_re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g; 

            if(!pw_re.test(this.curr_pw)){
                this.entry_error = true; 
                this.entry_error_msg = "Passwords must be at least 8 digits long and contain at least 1 uppercase character, 1 lowercase character, and 1 digit."; 
                return false; 
            }
        }

        // Email check
        if(this.new_user){
            let email_re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g; 
            if(!email_re.test(this.curr_email)){
                this.entry_error = true; 
                this.entry_error_msg = "Please enter a valid email address."; 
                return false; 
            }
        }

        this.entry_error = false; 
        return true;
    }

    onEntryChange(){
        this.btn_active = this.validateUserInfo(); 
    }


}