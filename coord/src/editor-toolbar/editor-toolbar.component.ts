import { Component } from '@angular/core'; 
import { SaveCoordService } from 'src/service/save_coords.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'editor-toolbar',
    templateUrl: './editor-toolbar.component.html',
    styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent{

    isSaveEnabled : boolean = false; 
    saving : boolean = false; 

    constructor (private saveCoordService : SaveCoordService, private spinner : NgxSpinnerService ){

        // Wait for coord to be initialized to activate save button
        this.saveCoordService.coordInitializedSubj.subscribe( (newState : boolean) => {
            this.isSaveEnabled = newState; 
        }); 
    }

    onSaveCoordBtnClick(){

        this.saving = true; 
        this.spinner.show("saving-spinner"); 
        this.saveCoordService.saveCoord().then( (res:any) => {
            console.log(res); 
            this.spinner.hide("saving-spinner"); 
            this.saving = false; 
        }); 
    }
}