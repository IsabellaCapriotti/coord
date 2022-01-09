import { Component, Input } from "@angular/core";
import { Router } from "@angular/router"; 

@Component({
    selector: 'coord-panel', 
    templateUrl: './coord-panel.component.html',
    styleUrls: ['./coord-panel.component.css']
})
export class CoordPanelComponent{

    @Input() coordID : string = "";  
    @Input() previewImgSrc : string = ""; 

    constructor( private router : Router ){}

    // When a coord is selected, open up the editor to view that coord
    onCoordClick(){

        this.router.navigate(['/coord-editor'], {
            queryParams: {
                'coordID': this.coordID
            }
        }); 
    }

}