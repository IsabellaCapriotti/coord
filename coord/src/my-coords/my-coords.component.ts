import { Component, OnInit } from "@angular/core";
import { SaveCoordService } from "src/service/save_coords.service";

@Component({
    'selector': 'my-coords',
    'templateUrl': './my-coords.component.html',
    'styleUrls': ['./my-coords.component.css']
})
export class MyCoordsComponent implements OnInit{

    // List of saved coords to show
    savedCoords : any[] = []; 

    constructor( private saveCoordService : SaveCoordService ){

    }

    ngOnInit(){
        
        // Get initial saved coords 
        this.saveCoordService.get_saved_coords().then( (res:any) => {
            console.log('in mycoords'); 
            console.log(res); 
        })
    }
}