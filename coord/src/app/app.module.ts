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

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { SafePipeModule } from 'safe-pipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ProductPanelComponent } from 'src/product-panel/product-panel.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    CoordEditorComponent,
    CurrentCoordComponent,
    AddItemMenuComponent,
    EditorToolbarComponent,
    ProductImgCardComponent,
    ProductPanelComponent
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
    PerfectScrollbarModule
  ],
  providers: [
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
