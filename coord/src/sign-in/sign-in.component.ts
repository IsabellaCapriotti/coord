import { Component } from '@angular/core'; 

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{

    onSignInSuccess(){
        console.log('signed in'); 
    }
}