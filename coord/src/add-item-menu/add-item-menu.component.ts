import { Component } from "@angular/core";
import { ImageFetchService } from "src/service/img-fetch.service";

@Component({
    selector: 'add-item-menu',
    templateUrl: './add-item-menu.component.html',
    'styleUrls': ['./add-item-menu.component.css']
})
export class AddItemMenuComponent{


    currentURL:string = ""
    imageSources : string[] = []
    newImagesActive : boolean = false; 

    // Expanding/collapsing menu
    isMenuExpanded : boolean = false; 
    triangleOffset : string = '0px';
    updatingOffset : boolean = false; 

    constructor(private imageFetchService : ImageFetchService ){}

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

        //console.log('updated offset to', this.triangleOffset); 
    }

    // ********************************************
    // ADDING NEW ITEMS
    // ********************************************
    onAddItemButton(){
        //console.log(this.currentURL); 
        
        // Get potential images
        this.imageFetchService.getProductImageSrc(this.currentURL).toPromise().then( (res:any) => {
            this.newImagesActive = true; 
            this.imageSources = res['sources']
            //console.log(this.imageSources); 
        }, 
        (err:any) => {
            console.log('got error'); 
            console.log(err)
            alert('Oops! Looks like that wasn\'t a valid URL. Please try again.')
        }); 

    }
    
    // If an image fails to load, remove it from the list of images to render
    handleBadImage(badURL:string){
        this.imageSources = this.imageSources.filter( (src:any) => src != badURL); 
    }
}