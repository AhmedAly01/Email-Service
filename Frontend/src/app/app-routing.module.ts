import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {SignedInAuthGuard} from "./guards/signed-in-auth.guard";
import {ComposeComponent} from "./compose/compose.component";
import {InboxComponent} from "./inbox/inbox.component";
import {SentComponent} from "./sent/sent.component";
import {DraftComponent} from "./draft/draft.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {TrashComponent} from "./trash/trash.component";

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
    canActivate: [AuthGuard],
  },
  {
    path: 'home/compose',
    component: ComposeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/inbox',
    component: InboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/sent',
    component: SentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/drafts',
    component: DraftComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/contacts',
    component: ContactsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/trash',
    component: TrashComponent,
    canActivate: [AuthGuard]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
