import { Component } from "@angular/core";
import { Product } from "../utils/types"
import { SaveCoordService } from "src/service/save_coords.service";
import { ActivatedRoute } from "@angular/router"; 
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'ext-view-coord',
    templateUrl: './ext-view-coord.component.html',
    styleUrls: ['./ext-view-coord.component.css']
})
export class ExtViewCoordComponent{

    coordID : string = ""; 

    activeProducts : Product[] = []; 

    editorWidth : number = 0; 
    editorHeight : number = 0; 

    errorActive : boolean = false; 
    currErrorMsg : string = ""; 

    constructor( private route : ActivatedRoute, private saveCoordService : SaveCoordService,
        private spinner : NgxSpinnerService){

        // Load Coord from ID in route
        route.params.subscribe( (params:any) => {
            if('coordID' in params){
                this.coordID = params['coordID']; 
                this.loadCoord(); 
            }
            else{
                this.errorActive = true; 
                this.currErrorMsg = "Oops! This Coord ID doesn't exist."
            }
        }); 
    }


    loadCoord(){
        this.spinner.show("extcoord-load"); 
        this.saveCoordService.get_coord(this.coordID).then( (res:any) => {

            if(res != null){

                // Check if Coord is private
                if(!res['isPublic']){
                    this.errorActive = true; 
                    this.currErrorMsg = "This Coord is private!"
                }

                else{
                    // Update state to match fetched Coord
                    this.editorWidth = res['width']
                    this.editorHeight = res['height']

                    let prods = res['products']; 
                    this.activeProducts = prods; 
                }
            }
            else{
                this.errorActive = true; 
                this.currErrorMsg = "Oops! This Coord ID doesn't exist."
            }

            this.spinner.hide("extcoord-load"); 
                        
        }); 
    }
}