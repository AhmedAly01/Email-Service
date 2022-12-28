import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../guards/auth.guard";
import {Router} from "@angular/router";
import {SignedInAuthGuard} from "../guards/signed-in-auth.guard";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authGuard: AuthGuard, private signedAuth: SignedInAuthGuard) { }

  ngOnInit(): void {
    if (!this.authGuard.isSignedIn) {
      this.router.navigateByUrl('').then();
    }
  }

  signOut() {
    this.authGuard.isSignedIn = false;
    this.signedAuth.isSignedIn = false;
    this.router.navigateByUrl('').then();
  }
}
