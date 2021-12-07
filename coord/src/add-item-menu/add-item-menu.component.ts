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
    isMenuExpanded : boolean = true; 

    constructor(private imageFetchService : ImageFetchService ){}

    // ********************************************
    // EXPANDING / COLLAPSING MENU 
    // ********************************************
    toggleMenu(){
        this.isMenuExpanded = !this.isMenuExpanded; 
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