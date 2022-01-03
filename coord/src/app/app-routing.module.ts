import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordEditorComponent } from 'src/coord-editor/coord-editor.component';
import { MyCoordsComponent } from 'src/my-coords/my-coords.component';
import { SignInComponent } from 'src/sign-in/sign-in.component';

const routes: Routes = [

  {'path': 'my-coords', 'component': MyCoordsComponent},
  {'path': 'coord-editor', 'component': CoordEditorComponent},
  {'path': '', 'component': SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
