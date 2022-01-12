import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { CoordEditorComponent } from 'src/coord-editor/coord-editor.component';
import { CurrentCoordComponent } from 'src/current-coord/current-coord.component';
import { AddItemMenuComponent } from 'src/add-item-menu/add-item-menu.component';
import { EditorToolbarComponent } from 'src/editor-toolbar/editor-toolbar.component';
import { ProductImgCardComponent } from 'src/product-img-card/product-img-card.component';
import { ProductPanelComponent } from 'src/product-panel/product-panel.component';
import { EditorImgComponent } from 'src/editor-img/editor-img.component';
import { SignInComponent } from 'src/sign-in/sign-in.component';
import { CoordPanelComponent } from 'src/coord-panel/coord-panel.component';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { SafePipeModule } from 'safe-pipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from "ngx-spinner"; 
import { MyCoordsComponent } from 'src/my-coords/my-coords.component';
import { LoginGuard } from 'src/utils/loginGuard';
import { LoggedInGuard } from 'src/utils/loggedInGuard';
import { ExtViewCoordComponent } from 'src/ext-view-coord/ext-view-coord.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};


@NgModule({
  declarations: [
    AppComponent,
    CoordEditorComponent,
    CurrentCoordComponent,
    AddItemMenuComponent,
    EditorToolbarComponent,
    ProductImgCardComponent,
    ProductPanelComponent,
    EditorImgComponent,
    SignInComponent,
    MyCoordsComponent,
    CoordPanelComponent,
    ExtViewCoordComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    SafePipeModule,
    MatIconModule,
    PerfectScrollbarModule,
    NgxSpinnerModule
  ],
  providers: [
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }, 
  LoginGuard,
  LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
