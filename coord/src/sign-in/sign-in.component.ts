import { Component, OnInit } from '@angular/core'; 
import { AuthService } from 'src/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, GuardsCheckStart, GuardsCheckEnd } from '@angular/router';

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
    private router : Router ){

        // Handling router events
        // this.router.events.subscribe( ( e : RouterEvent )=> {
            
        //     console.log('gottie'); 
        //     console.log(e); 
        //     if(e instanceof GuardsCheckStart){
        //         this.spinner.show("page-load"); 
        //     }
        //     else{
        //         this.spinner.hide("page-load"); 
        //     }
        // })
    }

    ngOnInit(){
        // Check if a valid session already exists; if it does, skip login for this user
        this.authService.check_session().then( (res:any) => {
            console.log('session state: ' + res); 

            if(res){
                this.router.navigate(['/my-coords']); 
            }
        }); 
    }

    onSignInBtnClick(){

        this.spinner.show('sign-in-spinner'); 
        this.authService.login(this.curr_un, this.curr_pw).then( (res:any)=> {

            // Handle user that doesn't exist
            if(res['userState'] == 'not_found'){
                this.new_user = true; 
                this.entry_error = false; 
                this.pw_error = false; 
                this.spinner.hide('sign-in-spinner'); 
            }
            // Handle valid user; 
            else if(res['userState'] == 'valid'){
                
                // Create session
                console.log('creating session'); 
                this.authService.gen_session().then( (res:any) => {

                    this.new_user = false; 
                    this.entry_error = false; 
                    this.pw_error = false; 

                    this.router.navigate(['/my-coords']).then( () => {
                        this.spinner.hide('sign-in-spinner'); 
                    }); 

                }); 
            
            }
            // Handle invalid credentials
            else if(res['userState'] == 'invalid'){
                this.new_user = false; 
                this.pw_error = true; 
                this.spinner.hide('sign-in-spinner'); 

            }
        }
        ); 

    }

    onCreateBtnClick(){

        // Create a new user in the database        
        this.spinner.show('sign-in-spinner'); 

        this.authService.create_user(this.curr_un, this.curr_pw, this.curr_email).then( (res:any) => {
            
            // Successful new user
            if(res['userState'] == 'success'){
                this.new_user = false; 
                this.entry_error = false; 
                this.pw_error = false; 

                console.log('creating session'); 

                this.authService.gen_session().then( (res:any) => {
                    this.router.navigate(['/my-coords']).then( () => {
                        this.spinner.hide('sign-in-spinner'); 
                    })
                }); 
                    

            }
            // User already exists
            else if(res['userState'] == 'exists'){
                this.entry_error_msg = "Looks like an account with that username already exists. Please try logging in instead!"; 
                this.entry_error = true; 
                this.new_user = false; 
                this.pw_error = false; 
                this.spinner.hide('sign-in-spinner'); 
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