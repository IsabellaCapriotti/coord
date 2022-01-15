import { Component, HostBinding } from "@angular/core";
import { Product, Coord } from "src/utils/types";
import { SaveCoordService } from "src/service/save_coords.service";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'current-coord',
    templateUrl: './current-coord.component.html',
    'styleUrls': ['./current-coord.component.css']
})
export class CurrentCoordComponent{

    activeProducts : Product[] = []; 

    editorWidth : number = 0; 
    editorHeight : number = 0; 

    initialized : boolean = false; 

    @HostBinding('style.padding.px') pxOffset : number = 0; 

    isExistingCoord : boolean = false; 
    coordID : string = ""; 

    constructor(private saveCoordService : SaveCoordService, private route : ActivatedRoute,
        private spinner : NgxSpinnerService ){

        // Check if the route contains query parameter for an existing Coord or not
        this.route.queryParams.subscribe( (qp : any) => {


            if('coordID' in qp && qp.coordID != ""){
                this.isExistingCoord = true; 
                this.initialized = true; 
                this.coordID = qp.coordID; 

                this.loadCoord(); 
                this.saveCoordService.setCoordID(this.coordID); 
            } 
        }); 

        // Initialize default width and height
        this.editorWidth = screen.width; 
        this.editorHeight = screen.height - 200; 

        // Subscribe to changes in active products list
        this.saveCoordService.productsInCoordSubj.subscribe( (newProds: Product[]) => {
            this.activeProducts = newProds; 
        }); 

    }

    onSubmitDimensionsBtnClick(){
        this.initialized = true; 
        this.pxOffset = 10;

        this.saveCoordService.assignDimensions(this.editorWidth, this.editorHeight);
    }

    // Fetches and loads information on an existing Coord into the active editor.
    loadCoord(){

        this.spinner.show("coord-load"); 
        this.saveCoordService.get_coord(this.coordID).then( (res:any) => {

            // Update state to match fetched Coord
            this.editorWidth = res['width']
            this.editorHeight = res['height']

            let prods = res['products']; 
            this.activeProducts = prods; 
            
            this.pxOffset = 10;
            this.saveCoordService.assignDimensions(this.editorWidth, this.editorHeight);
            
            this.saveCoordService.setLinkSharingState(res['isPublic']); 

            this.spinner.hide("coord-load"); 
        }); 
    }
}