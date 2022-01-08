import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd } from "@angular/router"; 
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coord';

  auth : boolean = false 

  constructor( private router : Router, private spinner : NgxSpinnerService ){

    this.router.events.subscribe( (e : any) => {
      
      if(e instanceof NavigationStart){
        this.spinner.show("page-load"); 
      }
      else if(e instanceof NavigationEnd){
        this.spinner.hide("page-load"); 
      }
    }); 
  }



}
