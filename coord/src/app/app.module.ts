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

import {MatCardModule} from '@angular/material/card';
import { SafePipeModule } from 'safe-pipe';

@NgModule({
  declarations: [
    AppComponent,
    CoordEditorComponent,
    CurrentCoordComponent,
    AddItemMenuComponent,
    EditorToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    SafePipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
