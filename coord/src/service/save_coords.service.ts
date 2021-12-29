import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../utils/types';
import { Subject } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
})
export class SaveCoordService{

    // Map of currently activate product indices to their associated products, subject to keep track of changes
    productsInCoord : Map<number, Product> = new Map<number, Product>();  
    productsList : Product[] = []; 
    productsInCoordSubj : Subject<Product[]> = new Subject<Product[]>(); 

    constructor( private http : HttpClient){}


    saveCoord(){

        return this.http.post(environment.apiUrl + '/savecoord', {'data': {
            'something': 'something'
        }}); 
    }

    addProduct(newProd : Product){
        this.productsInCoord.set(newProd.productID, newProd); 
        this.productsList.push(newProd); 
        this.productsInCoordSubj.next(this.productsList); 

    }
    
    updateProduct(newProd : Product){
        
        // Update or add to list of products depending on whether or not it already exists
        if(this.productsInCoord.has(newProd.productID)){
            this.productsList = this.productsList.map( (prod: Product) => {
                if(prod.productID == newProd.productID){
                    prod = newProd; 
                }
                return prod; 
            }); 
        }
        else{
            this.productsList.push(newProd); 
        }
        
        this.productsInCoord.set(newProd['productID'], newProd); 

        this.productsInCoordSubj.next(this.productsList); 
        console.log('updated'); 
        console.log(this.productsInCoord);
        console.log(this.productsList);  
    }

    removeProduct(toRemove : Product){
        this.productsInCoord.delete(toRemove['productID']); 
        this.productsList = this.productsList.filter( (prod:Product) => prod.productID != toRemove.productID); 
        this.productsInCoordSubj.next(this.productsList); 
        console.log('deleted'); 
        console.log(this.productsInCoord); 
    }

}