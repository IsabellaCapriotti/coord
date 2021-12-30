import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Coord, Product } from '../utils/types';
import { Subject } from 'rxjs'; 


@Injectable({
    providedIn: 'root'
})
export class SaveCoordService{

    coordInitialized : boolean = false; 
    coordInitializedSubj : Subject<boolean> = new Subject<boolean>(); 

    // Map of currently activate product indices to their associated products, subject to keep track of changes
    productsInCoord : Map<number, Product> = new Map<number, Product>();  
    productsList : Product[] = []; 
    productsInCoordSubj : Subject<Product[]> = new Subject<Product[]>(); 

    // Dimensions
    coordWidth : number = 0; 
    coordHeight : number = 0; 

    constructor( private http : HttpClient){}


    saveCoord(){

        // Create Coord JSON to send to database
        let newCoord = new Coord(this.productsList, this.coordWidth, this.coordHeight); 

        return this.http.post(environment.apiUrl + '/savecoord', JSON.stringify(newCoord),
        {
            'headers':
            {'Content-Type': 'application/json'},
            'responseType': 'text'
        }); 
    }  

    // Adds a new product to the list 
    addProduct(newProd : Product){
        this.productsInCoord.set(newProd.productID, newProd); 
        this.productsList.push(newProd); 
        this.productsInCoordSubj.next(this.productsList); 

    }
    
    // Updates an existing product
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


    // Removes an existing product
    removeProduct(toRemove : Product){
        this.productsInCoord.delete(toRemove['productID']); 
        this.productsList = this.productsList.filter( (prod:Product) => prod.productID != toRemove.productID); 
        this.productsInCoordSubj.next(this.productsList); 
        console.log('deleted'); 
        console.log(this.productsInCoord); 
    }

    // Assigns a width and height to the coord, sends message that coord has been initialized
    assignDimensions(width : number, height : number){
        this.coordWidth = width; 
        this.coordHeight = height;
        
        this.coordInitialized = true; 
        this.coordInitializedSubj.next(this.coordInitialized); 

    }

}