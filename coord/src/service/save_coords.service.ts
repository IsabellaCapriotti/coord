import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Coord, Product } from '../utils/types';
import { Subject, lastValueFrom } from 'rxjs'; 
import { AuthService } from './auth.service';


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

    constructor( private http : HttpClient, private authService : AuthService ){}


    // *********************************************************
    // SAVING / CREATING NEW COORDS
    // *********************************************************
    async saveCoord(){

        // Create Coord JSON to send to database
        let userID = this.authService.get_coord_user_cookie(); 

        let newCoord = new Coord(this.productsList, this.coordWidth, this.coordHeight, userID); 

        return await lastValueFrom(this.http.post(environment.apiUrl + '/savecoord', JSON.stringify(newCoord),
        {
            'headers':
            {'Content-Type': 'application/json'},
            'responseType': 'text'
        }));
               
    }  

    
    // *********************************************************
    // UPDATING CURRENTLY EDITING COORD 
    // *********************************************************
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
    
    // *********************************************************
    // LOADING SAVED COORDS
    // *********************************************************
    async get_saved_coords(){

        // Get user ID
        let userID = this.authService.get_coord_user_cookie(); 

        // Retrieve saved coords for this user from backend
        let server_coords : any = await lastValueFrom( this.http.get(environment.apiUrl + '/getsavedcoords?userID=' + userID));
        server_coords = server_coords['foundCoords']

        // Convert into Coord objects
        let ret_coords = []
        for(let i=0; i < server_coords.length; i++){
            let curr_entry = server_coords[i]; 

            ret_coords.push(new Coord(
                curr_entry['products'],
                curr_entry['width'],
                curr_entry['height'],
                curr_entry['userID'],
                curr_entry['coordID']
            )); 
        }

        return ret_coords; 
    }
}