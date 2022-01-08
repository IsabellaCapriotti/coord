import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordEditorComponent } from 'src/coord-editor/coord-editor.component';
import { MyCoordsComponent } from 'src/my-coords/my-coords.component';
import { SignInComponent } from 'src/sign-in/sign-in.component';
import { LoggedInGuard } from 'src/utils/loggedInGuard';
import { LoginGuard } from 'src/utils/loginGuard';

const routes: Routes = [

  {'path': 'my-coords', 'component': MyCoordsComponent, canActivate: [LoginGuard] },
  {'path': 'coord-editor', 'component': CoordEditorComponent, canActivate: [LoginGuard] },
  {'path': 'login', component: SignInComponent, canActivate: [LoggedInGuard] },
  {'path': '', 'component': SignInComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
