import { Component } from "@angular/core";
import { Product } from "src/utils/product-type";

@Component({
    selector: 'coord-editor',
    templateUrl: './coord-editor.component.html',
    'styleUrls': ['./coord-editor.component.css']
})
export class CoordEditorComponent{

    activeProducts : Product[] = []; 

    onProductsChanged(newProds : Product[]){
        this.activeProducts = newProds; 
        console.log(newProds); 
    }
}