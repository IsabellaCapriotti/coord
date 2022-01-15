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

    // Save state
    isSaveEnabled : boolean = false; 
    saving : boolean = false; 

    // Link sharing
    linkSharePopup : boolean = false; 
    linkSharingState : boolean = false; 
    linkShareStateChanged : boolean = false; 

    // Coord state
    coordID : string = ""; 

    constructor (private saveCoordService : SaveCoordService, private spinner : NgxSpinnerService,
        private authService : AuthService ){

        // Wait for coord to be initialized to activate save button
        this.saveCoordService.coordInitializedSubj.subscribe( (newState : boolean) => {
            this.isSaveEnabled = newState; 
        }); 

        // Subscribe to changes in link sharing state
        this.saveCoordService.linkSharingStateSubj.subscribe( (newState : boolean) => {
            this.linkSharingState = newState; 
        }); 

        // Subscribe to changes in Coord ID
        this.saveCoordService.coordIDSubj.subscribe( (newID : string) =>{
            this.coordID = newID; 
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

    /* Link sharing Coord */ 
    onToggleChange(e : any){
        
        this.linkShareStateChanged = true; 

        if(e.checked){
            this.linkSharingState = true; 
        }
        else{
            this.linkSharingState = false; 
        }
        this.saveCoordService.setLinkSharingState(this.linkSharingState);  
    }

    enableLinkPopup(){
        this.linkSharePopup = true;
    }
    disableLinkPopup(){
        this.linkSharePopup = false; 
    }

    createCoordLink(){
        return window.origin + '/view-coord/' + this.coordID; 
    }
}