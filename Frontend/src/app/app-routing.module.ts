import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";

const routes: Routes =[
  {
    path: '',
    component: SignInPageComponent
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
