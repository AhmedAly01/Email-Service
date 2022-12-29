import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../guards/auth.guard";
import {Router} from "@angular/router";
import {SignedInAuthGuard} from "../guards/signed-in-auth.guard";
import {UserService} from "../service/user/user-service.service";
import {User} from "../models/user/user";
import {CacheService} from "../service/cache/cache.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string | undefined;

  constructor(private service: UserService, private router: Router, private authGuard: AuthGuard, private signedAuth: SignedInAuthGuard, private cache: CacheService) { }

  ngOnInit(): void {
    if (!this.authGuard.isSignedIn) {
      this.router.navigateByUrl('').then();
    }
    if (this.cache.user === undefined) {
      this.service.user?.subscribe((data: User) => {
        this.user = data.name;
        this.cache.user = this.user;
      });
    }
    else {
      this.user = this.cache.user;
    }
  }

  signOut() {
    this.authGuard.isSignedIn = false;
    this.signedAuth.isSignedIn = false;
    this.router.navigateByUrl('').then();
  }
}
