import { Component, Input } from "@angular/core";
import { Product } from "src/utils/product-type";

@Component({
    selector: 'current-coord',
    templateUrl: './current-coord.component.html',
    'styleUrls': ['./current-coord.component.css']
})
export class CurrentCoordComponent{

    @Input() activeProducts : Product[] = []; 

    
}