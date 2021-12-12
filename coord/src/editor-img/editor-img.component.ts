import { Component, ElementRef, Input, ViewChild, AfterViewInit, HostListener } from '@angular/core'; 

@Component({
    selector: 'editor-img',
    templateUrl: './editor-img.component.html',
    styleUrls: ['./editor-img.component.css']
})
export class EditorImgComponent implements AfterViewInit{

    @Input() imageSrc: string = ""; 
    @ViewChild('imgContainer') imgContainer !: ElementRef; 

    
    currHeight : number = -1; 
    currWidth : number = -1; 

    isDraggingResizer : boolean = false; 
    resizeStartX : number = 0; 
    resizeStartY : number = 0; 
    resizeStartWidth : number = 0; 
    resizeStartHeight : number = 0; 

    ngAfterViewInit(): void {
        console.log(this.imgContainer); 

        // Get initial height and width of image
        this.currHeight = this.imgContainer.nativeElement.offsetHeight; 
        this.currWidth = this.imgContainer.nativeElement.offsetWidth; 
    }

    onResizerMousedown(event:any){
        console.log('clicked ' + event.clientX + ' ' + event.clientY);
        
        this.isDraggingResizer = true; 
        this.resizeStartX = event.clientX; 
        this.resizeStartY = event.clientY; 
        this.resizeStartHeight = this.imgContainer.nativeElement.offsetHeight; 
        this.resizeStartWidth = this.imgContainer.nativeElement.offsetWidth; 
    }

    @HostListener('window:mousemove', ['$event'])
    onResizerMousemove(event:any){

        if(this.isDraggingResizer){
            //console.log('dragging'); 

            // Add distance dragged to original dimensions 
            let widthDiff = event.clientX - this.resizeStartX; 
            let heightDiff = event.clientY - this.resizeStartY; 

     
            this.currWidth = this.resizeStartWidth + widthDiff; 
            this.currHeight = this.resizeStartHeight + heightDiff; 
            
          
            console.log(this.currWidth); 
            console.log(this.currHeight)
 
        }
    }

    @HostListener('window:mouseup', ['$event'])
    onResizerMouseup(event:any){

        console.log('stopped clicking ' + event.clientX + event.clientY); 

        this.isDraggingResizer = false; 

       
    }


}