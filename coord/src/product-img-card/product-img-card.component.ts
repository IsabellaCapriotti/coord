import { Component, Input, Output, EventEmitter } from '@angular/core'; 

@Component({
    selector: 'product-img-card',
    templateUrl: './product-img-card.component.html', 
    styleUrls: ['./product-img-card.component.css']
})
export class ProductImgCardComponent{

    @Input() imageSrc : string = "";
    @Output() badImageEvent : EventEmitter<string> = new EventEmitter(); 

    // If an image fails to load, tell the parent container to remove it from the list of images to render
    handleBadImage(event:any){
        let badURL = event.target.attributes.src.value;
        this.badImageEvent.emit(badURL); 
        
    }
}