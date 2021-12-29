import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SaveCoordService } from 'src/service/save_coords.service';
import { Product } from 'src/utils/types';

@Component({
    selector: 'product-panel',
    templateUrl: './product-panel.component.html',
    styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent implements AfterViewInit{

    imageSrc : string = ""; 
    productName : string = ""; 
    productID!: number;
    
    @Input() productRef !: Product; 


    @Output() hiddenChangedEvent : EventEmitter<any> = new EventEmitter<any>(); 
    @Output() deleteEvent : EventEmitter<number> = new EventEmitter<number>(); 

    isHidden : boolean = false; 

    newProductName : string = ""; 
    editing : boolean = false; 

    constructor(private saveCoordService : SaveCoordService){}

    ngAfterViewInit(): void {

        // Initialize product fields based on passed product reference
        this.imageSrc = this.productRef.imageSrc; 
        this.productName = this.productRef.productName; 
        this.productID = this.productRef.productID; 

    }
    
    // Update product name when new one is entered
    onConfirmProductName(){
        this.productName = this.newProductName; 
        this.productRef.productName = this.newProductName; 

        this.saveCoordService.updateProduct(this.productRef); 

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
        this.productRef.isHidden = !this.productRef.isHidden; 
        this.saveCoordService.updateProduct(this.productRef); 

        //this.hiddenChangedEvent.emit([this.productID, this.isHidden]); 
    }

    onDeleteProductBtnClick(){

        this.saveCoordService.removeProduct(this.productRef); 

        //this.deleteEvent.emit(this.productID); 
    }

    // onProductHiddenChanged(event:any){
    //     let prod = event[0]; 
    //     let newHiddenState = event[1]; 

    //     this.activeProducts = this.activeProducts.map( (curr_prod:Product) => {
            
    //         if(curr_prod.productID == prod){
    //             curr_prod.isHidden = newHiddenState; 
    //             this.saveCoordService.updateProduct(curr_prod); 
    //         }

    //         return curr_prod; 
    //     }); 

    // }

    // onProductDeleted(event:number){

    //     this.activeProducts = this.activeProducts.filter( (prod:Product) => 
    //     {
    //         if(prod.productID != event){
    //             return true; 
    //         }
            
    //         this.saveCoordService.removeProduct(prod); 
    //         return false;
    //     }); 


    // }
}