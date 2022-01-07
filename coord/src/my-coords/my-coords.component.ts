import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/service/auth.service";

@Component({
    'selector': 'my-coords',
    'templateUrl': './my-coords.component.html',
    'styleUrls': ['./my-coords.component.css']
})
export class MyCoordsComponent implements OnInit{

    constructor( private authService : AuthService){}

    ngOnInit(){
        //this.authService.check_session(); 
    }
}