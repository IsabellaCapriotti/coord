import { Component } from '@angular/core'; 
import { SaveCoordService } from 'src/service/save_coords.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/service/auth.service';

@Component({
    selector: 'editor-toolbar',
    templateUrl: './editor-toolbar.component.html',
    styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent{

    isSaveEnabled : boolean = false; 
    saving : boolean = false; 

    constructor (private saveCoordService : SaveCoordService, private spinner : NgxSpinnerService,
        private authService : AuthService ){

        // Wait for coord to be initialized to activate save button
        this.saveCoordService.coordInitializedSubj.subscribe( (newState : boolean) => {
            this.isSaveEnabled = newState; 
        }); 
    }

    onSaveCoordBtnClick(){

        this.saving = true; 
        this.spinner.show("saving-spinner"); 
        this.saveCoordService.saveCoord().then( (res:any) => {
            this.spinner.hide("saving-spinner"); 
            this.saving = false; 
        }); 
    }

    onLogoutBtnClick(){
        this.authService.logout(); 
    }
}