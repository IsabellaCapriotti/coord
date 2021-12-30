export class Product{

    // Image/product properties
    imageSrc : string = "";
    productName : string = ""; 
    isHidden : boolean = false; 

    // ID
    productID : number; 
    static latestID : number = 0; 

    // Positional properties
    currHeight : number = 0; 
    currWidth : number = 0; 
    currLeftOffset : number = 0; 
    currTopOffset : number = 0; 
    currZIdx : number = 0; 
    
    constructor (newSrc : string, newName : string=""){
        this.imageSrc = newSrc; 
        this.productID = Product.latestID; 
        Product.latestID += 3;  
    }   

    // Function to assign new position
    updatePos(newH : number, newW : number, newLOffset : number, newTOffset : number, newZ : number){
        this.currHeight = newH; 
        this.currWidth = newW; 
        this.currLeftOffset = newLOffset; 
        this.currTopOffset = newTOffset; 
        this.currZIdx = newZ; 
    }

}

export class Coord{

    products : Product[] = []; 
    width : number = 0; 
    height : number = 0; 

    constructor(newProds : Product[], dimX : number, dimY : number){
        this.products = newProds; 
        this.width = dimX; 
        this.height = dimY; 
    }
    
}