import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/service/auth.service";
import { Router, Event as RouterEvent } from "@angular/router";

@Component({
    'selector': 'my-coords',
    'templateUrl': './my-coords.component.html',
    'styleUrls': ['./my-coords.component.css']
})
export class MyCoordsComponent implements OnInit{

    constructor( private authService : AuthService, private router : Router ){

    }

    ngOnInit(){
        //this.authService.check_session(); 
    }
}