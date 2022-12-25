import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {SignedInAuthGuard} from "./guards/signed-in-auth.guard";

const routes: Routes =[
  {
    path: '',
    component: SignInPageComponent,
    canActivate: [SignedInAuthGuard]
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    canActivate: [SignedInAuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
