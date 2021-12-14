import { Component, ElementRef, Input, ViewChild, AfterViewInit, HostListener } from '@angular/core'; 

@Component({
    selector: 'editor-img',
    templateUrl: './editor-img.component.html',
    styleUrls: ['./editor-img.component.css']
})
export class EditorImgComponent implements AfterViewInit{

    @Input() imageSrc: string = ""; 
    @ViewChild('imgContainer') imgContainer !: ElementRef; 

    // Resizing 
    currHeight : number = -1; 
    currWidth : number = -1; 
    isDraggingResizer : boolean = false; 
    resizeStartX : number = 0; 
    resizeStartY : number = 0; 
    resizeStartWidth : number = 0; 
    resizeStartHeight : number = 0; 

    // Moving 
    currLeftOffset : number = 0; 
    currTopOffset : number = 0; 
    isMoving : boolean = false; 
    moveStartX : number = 0; 
    moveStartY : number = 0; 
    moveStartLeftOffset : number = 0; 
    moveStartTopOffset : number = 0; 

    // Image options
    isOptionsMenuOpen : boolean = false; 
    currZIdx : number = 0; 


    ngAfterViewInit(): void {
        console.log(this.imgContainer.nativeElement.getBoundingClientRect()); 

        // Get initial height and width of image
        this.currHeight = this.imgContainer.nativeElement.offsetHeight; 
        this.currWidth = this.imgContainer.nativeElement.offsetWidth;
    }


    // **********************************************
    // RESIZING
    // **********************************************
    onResizerMousedown(event:any){
    
        // Start dragging process
        this.isDraggingResizer = true; 

        // Save initial values of mouse position and element dimensions
        this.resizeStartX = event.clientX; 
        this.resizeStartY = event.clientY; 
        this.resizeStartHeight = this.imgContainer.nativeElement.offsetHeight; 
        this.resizeStartWidth = this.imgContainer.nativeElement.offsetWidth; 
    }

    @HostListener('window:mousemove', ['$event'])
    onMousemove(event:any){

        // Handle resize 
        if(this.isDraggingResizer){

            // Add distance dragged to original dimensions 
            let widthDiff = event.clientX - this.resizeStartX; 
            let heightDiff = event.clientY - this.resizeStartY; 
     
            this.currWidth = this.resizeStartWidth + widthDiff; 
            this.currHeight = this.resizeStartHeight + heightDiff; 
            
        }

        // Handle move
        if(this.isMoving){
            
            // Add to offset based on distance dragged
            let xDiff = event.clientX - this.moveStartX; 
            let yDiff = event.clientY - this.moveStartY; 

            this.currLeftOffset = this.moveStartLeftOffset + xDiff; 
            this.currTopOffset = this.moveStartTopOffset + yDiff; 

            // Don't allow image out of bounds
            if(this.currLeftOffset < 0){
                this.currLeftOffset = 0; 
            }
            if(this.currTopOffset < 0){
                this.currTopOffset = 0; 
            }
        }
    }

    @HostListener('window:mouseup', ['$event'])
    onMouseup(event:any){

        // End resize and move once mouse is released
        this.isDraggingResizer = false; 
        this.isMoving = false; 

    }

    // **********************************************
    // MOVING
    // **********************************************
    onMoverMousedown(event:any){

        // Start moving process
        this.isMoving = true; 

        // Save initial values
        this.moveStartLeftOffset = this.currLeftOffset; 
        this.moveStartTopOffset = this.currTopOffset; 
        this.moveStartX = event.clientX; 
        this.moveStartY = event.clientY; 

    }

    disableDrag(event:any){
        event.preventDefault(); 
        event.stopPropagation(); 
    }


    // **********************************************
    // IMAGE OPTIONS
    // **********************************************

    // Open options menu on right click
    handleRightClick(event:any){
        event.preventDefault(); 
        event.stopPropagation(); 
        this.isOptionsMenuOpen = true; 
    }

    onMoveForwardClicked(){
        this.currZIdx += 1; 
    }
    onMoveBackwardClicked(){
        this.currZIdx -= 1; 
    }

    @HostListener('window:click', ['$event'])
    onParentClick(event : any){

        // Check if this click occurred outside of the options menu; if it did, hide the options
        // menu         
        if(!event.target.classList.contains('image-option')){
            this.isOptionsMenuOpen = false; 
        }
    }
}