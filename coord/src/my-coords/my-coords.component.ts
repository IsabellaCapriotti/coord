import { Component, OnInit } from "@angular/core";
import { SaveCoordService } from "src/service/save_coords.service";
import { Coord } from "src/utils/types";

@Component({
    'selector': 'my-coords',
    'templateUrl': './my-coords.component.html',
    'styleUrls': ['./my-coords.component.css']
})
export class MyCoordsComponent implements OnInit{

    // List of saved coords to show
    savedCoords : Coord[] = []; 

    constructor( private saveCoordService : SaveCoordService ){

    }

    ngOnInit(){
        
        // Get initial saved coords 
        this.saveCoordService.get_saved_coords().then( (res:any) => {
            this.savedCoords = res; 
        }); 

    }

    // Returns the src attribute of the first product in a saved coord, or "" if the coord does
    // not contain any products to preview
    getPreviewImgSrc( coord : Coord){

        if(coord.products.length > 0){
            return coord.products[0]['imageSrc'];
        }
        else{
            return ""; 
        }
    }
}