import { Component } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coord';

  auth : boolean = false 

  constructor( private authService : AuthService ){

    this.authService.authSubj.subscribe((newState : boolean) => {
      this.auth = newState; 
    }); 
  }



}
