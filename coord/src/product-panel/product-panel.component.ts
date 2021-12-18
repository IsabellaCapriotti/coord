import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'product-panel',
    templateUrl: './product-panel.component.html',
    styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent{

    @Input() imageSrc : string = ""; 
    @Input() productName : string = ""; 
    @Input() productID!: number; 


    @Output() hiddenChangedEvent : EventEmitter<any> = new EventEmitter<any>(); 
    @Output() deleteEvent : EventEmitter<number> = new EventEmitter<number>(); 

    isHidden : boolean = false; 

    newProductName : string = ""; 
    editing : boolean = false; 
    
    // Update product name when new one is entered
    onConfirmProductName(){
        this.productName = this.newProductName; 

        if(this.editing){
            this.editing = false; 
        }
    }
    onEditProductName(){
        this.editing = true; 
    }

    // Other options
    onVisibilityBtnClick(){
        this.isHidden = !this.isHidden; 
        this.hiddenChangedEvent.emit([this.productID, this.isHidden]); 
    }

    onDeleteProductBtnClick(){
        this.deleteEvent.emit(this.productID); 
    }
}