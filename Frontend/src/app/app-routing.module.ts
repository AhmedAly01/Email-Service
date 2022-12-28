import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {SignInPageComponent} from "./sign-in-page/sign-in-page.component";
import {HomeComponent} from "./home/home.component";
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
  },
  {
    path: 'home/compose',
    component: ComposeComponent,
  },
  {
    path: 'home/inbox',
    component: InboxComponent,
  },
  {
    path: 'home/sent',
    component: SentComponent,
  },
  {
    path: 'home/drafts',
    component: DraftComponent,
  },
  {
    path: 'home/contacts',
    component: ContactsComponent,
  },
  {
    path: 'home/trash',
    component: TrashComponent,
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
