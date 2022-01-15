import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SaveCoordService } from "src/service/save_coords.service";
import { Coord } from "src/utils/types";
import { AuthService } from "src/service/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    'selector': 'my-coords',
    'templateUrl': './my-coords.component.html',
    'styleUrls': ['./my-coords.component.css']
})
export class MyCoordsComponent implements OnInit{

    // List of saved coords to show
    savedCoords : Coord[] = []; 

    constructor( private saveCoordService : SaveCoordService, private router : Router,
        private authService : AuthService, private spinner : NgxSpinnerService){

    }

    ngOnInit(){
        
        // Get initial saved coords 
        this.spinner.show("mycoords-load"); 
        this.saveCoordService.get_saved_coords().then( (res:any) => {
            this.savedCoords = res; 
            this.spinner.hide("mycoords-load"); 
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

    // Navigates to a new editor when the new Coord button is clicked
    openNewEditor(){
        this.router.navigate(['/coord-editor']); 
    }

    
    onLogoutBtnClick(){
        this.spinner.show("mycoords-load"); 
        this.authService.logout().then( () => {
            this.spinner.hide("mycoords-load"); 
        }); 
    }
}