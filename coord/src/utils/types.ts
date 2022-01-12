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

    // Indicates whether this product was newly added from the menu or loaded 
    // from an existing Coord
    fromExistingCoord : boolean = false; 

    // Indicates whether this Coord should be viewable via external link
    isPublic : boolean = false; 
    
    constructor (newSrc : string, newName : string="", fromExistingCoord : boolean = false ){
        this.imageSrc = newSrc; 
        this.productID = Product.latestID; 
        this.fromExistingCoord = fromExistingCoord; 
        Product.latestID += 1;  
    }   

    // Function to assign new position
    updatePos(newH : number, newW : number, newLOffset : number, newTOffset : number, newZ : number){
        this.currHeight = newH; 
        this.currWidth = newW; 
        this.currLeftOffset = newLOffset; 
        this.currTopOffset = newTOffset; 
        this.currZIdx = newZ; 
    }

    // Fills in the fields of the Product based on the passed object. For use in converting responses from the server into 
    // proper Product-type objects
    convertFromObj(obj : any){

        this.imageSrc = obj['imageSrc']
        this.productName = obj['productName']
        this.isHidden = obj['isHidden']
        this.productID = obj['productID']
        this.currHeight = obj['currHeight']
        this.currWidth = obj['currWidth']
        this.currLeftOffset = obj['currLeftOffset']
        this.currTopOffset = obj['currTopOffset']
        this.currZIdx = obj['currZIdx']
    }

}

export class Coord{

    userID : string = "";
    coordID : string = ""; 

    products : Product[] = []; 
    width : number = 0; 
    height : number = 0; 

    constructor(newProds : Product[], dimX : number, dimY : number, userID : string, coordID : string = ""){
        this.products = newProds; 
        this.width = dimX; 
        this.height = dimY; 
        this.userID = userID; 
        this.coordID = coordID; 
    }
    
}