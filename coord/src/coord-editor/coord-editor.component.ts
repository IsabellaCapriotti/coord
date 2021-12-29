import { Component } from "@angular/core";
import { Product } from "src/utils/types";
import { SaveCoordService } from "src/service/save_coords.service";

@Component({
    selector: 'coord-editor',
    templateUrl: './coord-editor.component.html',
    'styleUrls': ['./coord-editor.component.css']
})
export class CoordEditorComponent{

    constructor( private saveCoordService : SaveCoordService){

        // Subscribe to changes in active products
        this.saveCoordService.productsInCoordSubj.subscribe( (newProds : Product[]) => {
            this.activeProducts = newProds; 
        }); 
    }

    activeProducts : Product[] = []; 

    onProductsChanged(newProds : Product[]){
        this.activeProducts = newProds; 
        console.log(newProds); 
    }

    onWidthConfirmed(){
        
    }
}