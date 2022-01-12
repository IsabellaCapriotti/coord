import { Component } from "@angular/core";
import { Product, Coord } from "../utils/types"
import { AuthService } from "src/service/auth.service";
import { SaveCoordService } from "src/service/save_coords.service";
import { Router, ActivatedRoute } from "@angular/router"; 

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

    constructor( private authService : AuthService, private route : ActivatedRoute,
        private saveCoordService : SaveCoordService){

        // Load Coord from ID in route
        route.params.subscribe( (params:any) => {
            if('coordID' in params){
                this.coordID = params['coordID']; 
                this.loadCoord(); 
            }
        }); 
    }

    onLogoutBtnClick(){
        this.authService.logout(); 
    }

    loadCoord(){
        this.saveCoordService.get_coord(this.coordID).then( (res:any) => {

            if(res != null){
            // Update state to match fetched Coord
            this.editorWidth = res['width']
            this.editorHeight = res['height']

            let prods = res['products']; 
            this.activeProducts = prods; 
            }
                        
        }); 
    }
}