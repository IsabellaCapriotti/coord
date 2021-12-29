import { Component } from '@angular/core'; 
import { SaveCoordService } from 'src/service/save_coords.service';

@Component({
    selector: 'editor-toolbar',
    templateUrl: './editor-toolbar.component.html',
    styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent{

    constructor (private saveCoordService : SaveCoordService){}

    onSaveCoordBtnClick(){

        this.saveCoordService.saveCoord().toPromise().then( (res:any) => {
            console.log('successfully saved coord'); 
        }); 
    }
}