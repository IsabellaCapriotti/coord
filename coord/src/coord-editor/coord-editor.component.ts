import { Component } from "@angular/core";
import { Product } from "src/utils/types";
import { SaveCoordService } from "src/service/save_coords.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router"; 

@Component({
    selector: 'coord-editor',
    templateUrl: './coord-editor.component.html',
    'styleUrls': ['./coord-editor.component.css']
})
export class CoordEditorComponent{

    activeProducts : Product[] = []; 


    constructor( private saveCoordService : SaveCoordService, private route : ActivatedRoute ){

        // Subscribe to changes in active products
        this.saveCoordService.productsInCoordSubj.subscribe( (newProds : Product[]) => {
            this.activeProducts = newProds; 
        }); 

        this.route.queryParams.subscribe( (params : any) => {
            console.log(params); 
        })
    }


    onWidthConfirmed(){
        
    }
}