import { Component } from "@angular/core";
import { Product } from "src/utils/product-type";

@Component({
    selector: 'coord-editor',
    templateUrl: './coord-editor.component.html',
    'styleUrls': ['./coord-editor.component.css']
})
export class CoordEditorComponent{

    activeProducts : Product[] = []; 

    onNewProductAdded(newProd : Product){
        this.activeProducts.push(newProd); 
        console.log('new active products'); 
        console.log(this.activeProducts); 
    }
}