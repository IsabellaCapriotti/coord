import { Component } from "@angular/core";
import { ImageFetchService } from "src/service/img-fetch.service";
import { Product } from "src/utils/types"; 
import { SaveCoordService } from "src/service/save_coords.service";

@Component({
    selector: 'add-item-menu',
    templateUrl: './add-item-menu.component.html',
    'styleUrls': ['./add-item-menu.component.css']
})
export class AddItemMenuComponent{


    // Adding a new item
    currentURL:string = ""
    newImageSources : string[] = []
    newImagesActive : boolean = false; 

    // Expanding/collapsing menu
    isMenuExpanded : boolean = false; 
    triangleOffset : string = '0px';
    updatingOffset : boolean = false; 

    // Managing currently active products
    activeProducts : Product[] = []; 

    constructor(private imageFetchService : ImageFetchService, private saveCoordService : SaveCoordService ){

        // Subscribe to changes in products
        this.saveCoordService.productsInCoordSubj.subscribe( (newProds: Product[]) => {
            this.activeProducts = newProds; 
        }); 
    }

    // ********************************************
    // EXPANDING / COLLAPSING MENU 
    // ********************************************
    toggleMenu(){
        this.isMenuExpanded = !this.isMenuExpanded; 
        this.updateTriangleOffset(); 
    }

    // Updates the pixel offset of the triangle that expands/collapses the sidebar based on the 
    // current menu state and screen size. 
    updateTriangleOffset(){
        
        if(!this.isMenuExpanded){
            this.triangleOffset = '0px'; 
        }

        else if(window.innerWidth > 868){
            this.triangleOffset = '20%';
        }
        else{
            this.triangleOffset = '35%'; 
        }

    }

    // ********************************************
    // ADDING NEW ITEMS
    // ********************************************
    onAddItemButton(){
        
        // Get potential images
        this.imageFetchService.getProductImageSrc(this.currentURL).toPromise().then( (res:any) => {
            this.newImagesActive = true; 
            this.newImageSources = res['sources']
        }, 
        (err:any) => {
            console.log('got error'); 
            console.log(err)
            alert('Oops! Looks like that wasn\'t a valid URL. Please try again.')
        }); 

    }
    
    // If an image fails to load, remove it from the list of images to render
    handleBadImage(badURL:string){
        this.newImageSources = this.newImageSources.filter( (src:any) => src != badURL); 
    }

    // When the user selects which image to use for the new product, add it in the list of active images
    selectNewImage(event:any){

        // Add new product
        let newSrc = event.target.attributes.src.value; 
        let newProd = new Product(newSrc); 

        this.saveCoordService.addProduct(newProd); 

        // Clear out add menu 
        this.currentURL = ""; 
        this.newImageSources = []; 
        this.newImagesActive = false; 
    }
}