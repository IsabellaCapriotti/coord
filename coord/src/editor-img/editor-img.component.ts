import { Component, Input } from '@angular/core'; 

@Component({
    selector: 'editor-img',
    templateUrl: './editor-img.component.html',
    styleUrls: ['./editor-img.component.html']
})
export class EditorImgComponent{

    @Input() imageSrc: string = ""; 

    
}