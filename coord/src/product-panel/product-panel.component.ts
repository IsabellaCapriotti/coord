import { Component, Input, Output } from '@angular/core';

@Component({
    selector: 'product-panel',
    templateUrl: './product-panel.component.html',
    styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent{

    @Input() imageSrc : string = ""; 
    @Input() productName : string = ""; 

    newProductName : string = ""; 
    
}