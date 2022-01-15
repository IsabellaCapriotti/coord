import { Component, Input, AfterViewInit } from '@angular/core';
import { SaveCoordService } from 'src/service/save_coords.service';
import { Product } from 'src/utils/types';

@Component({
    selector: 'product-panel',
    templateUrl: './product-panel.component.html',
    styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent implements AfterViewInit{

    // Product properties
    imageSrc : string = ""; 
    productName : string = ""; 
    productID!: number;

    productPrice : number = -1; 
    
    @Input() productRef !: Product; 

    isHidden : boolean = false; 

    // Editing product name 
    newProductName : string = ""; 
    editing : boolean = false; 

    // Editing product price
    newProductPrice : string = ""; 
    editingPrice : boolean = false; 
    priceError : boolean = false; 

    constructor(private saveCoordService : SaveCoordService){}

    ngAfterViewInit(): void {

        // Initialize product fields based on passed product reference
        this.imageSrc = this.productRef.imageSrc; 
        this.productName = this.productRef.productName;
        this.productPrice = this.productRef.productPrice; 
        this.productID = this.productRef.productID; 

    }
    

    // Editing product name
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

    // Editing product price
    onConfirmProductPrice(){
        
        let converted = parseFloat(this.newProductPrice); 
        
        // Handle invalid prices
        if(isNaN(converted) || converted < 0){
            this.priceError = true; 

            setTimeout(() => {this.priceError = false;}, 1000 ); 
            return; 
        }
        
        // Update price if valid
        this.productPrice = converted; 
        this.productRef.productPrice = converted; 

        this.saveCoordService.updateProduct(this.productRef); 

        if(this.editingPrice){
            this.editingPrice = false; 
        }

    }

    onEditProductPrice(){
        this.editingPrice = true; 
    }

    // Other options
    onVisibilityBtnClick(){
        this.isHidden = !this.isHidden; 
        this.productRef.isHidden = !this.productRef.isHidden; 
        this.saveCoordService.updateProduct(this.productRef); 
    }

    onDeleteProductBtnClick(){

        this.saveCoordService.removeProduct(this.productRef); 

    }

}