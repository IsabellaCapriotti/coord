import { Component, HostBinding } from "@angular/core";
import { Product } from "src/utils/types";
import { SaveCoordService } from "src/service/save_coords.service";

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

    constructor(private saveCoordService : SaveCoordService){

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
}