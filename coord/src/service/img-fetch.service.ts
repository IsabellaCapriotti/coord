import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'; 
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ImageFetchService{

    constructor(private http : HttpClient){}

    getProductImageSrc(productURL : string){
        return this.http.post(environment.apiUrl + '/getimgs', {'productURL': productURL}, 
        {
            responseType: "json",
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
    }


}
