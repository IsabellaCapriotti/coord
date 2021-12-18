export class Product{
    imageSrc : string = "";
    productName : string = ""; 
    isHidden : boolean = false; 
    productID : number; 

    static latestID : number = 0; 
    
    constructor (newSrc : string, newName : string=""){
        this.imageSrc = newSrc; 
        this.productID = Product.latestID; 
        Product.latestID += 1;  
    }   

}