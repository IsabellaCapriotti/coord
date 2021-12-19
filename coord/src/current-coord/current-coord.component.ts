import { Component, Input } from "@angular/core";
import { Product } from "src/utils/product-type";

@Component({
    selector: 'current-coord',
    templateUrl: './current-coord.component.html',
    'styleUrls': ['./current-coord.component.css']
})
export class CurrentCoordComponent{

    @Input() activeProducts : Product[] = []; 

    editorWidth : number = 0; 
    editorHeight : number = 0; 

    initialized : boolean = false; 

    constructor(){

        // Initialize default width and height
        this.editorWidth = screen.width; 
        this.editorHeight = screen.height - 200; 
    }

    onSubmitDimensionsBtnClick(){
        this.initialized = true; 
    }
}