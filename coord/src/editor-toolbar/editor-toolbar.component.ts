import { Component } from '@angular/core'; 
import { SaveCoordService } from 'src/service/save_coords.service';

@Component({
    selector: 'editor-toolbar',
    templateUrl: './editor-toolbar.component.html',
    styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent{

    isSaveEnabled : boolean = false; 

    constructor (private saveCoordService : SaveCoordService){

        // Wait for coord to be initialized to activate save button
        this.saveCoordService.coordInitializedSubj.subscribe( (newState : boolean) => {
            this.isSaveEnabled = newState; 
        }); 
    }

    onSaveCoordBtnClick(){

        this.saveCoordService.saveCoord().toPromise().then( (res:any) => {
            console.log('successfully saved coord'); 
        }); 
    }
}