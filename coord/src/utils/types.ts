export class Product{
    imageSrc : string = "";
    productName : string = ""; 
    isHidden : boolean = false; 
    productID : number; 

    static latestID : number = 0; 
    
    constructor (newSrc : string, newName : string=""){
        this.imageSrc = newSrc; 
        this.productID = Product.latestID; 
        Product.latestID += 3;  
    }   

}

export class Coord{

    products : Product[] = []; 
    dimX : number = 0; 
    dimY : number = 0; 

    constructor(newProds : Product[], dimX : number, dimY : number){
        this.products = newProds; 
        this.dimX = dimX; 
        this.dimY = dimY; 
    }
    
}