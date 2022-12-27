import { Component, OnInit } from '@angular/core';
import { UserService } from "../user-service.service";
import { User } from "../user";
import { Router } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { SignedInAuthGuard } from "../guards/signed-in-auth.guard";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;

  constructor(private service: UserService, private router: Router, private authGuard: AuthGuard, private signedAuth: SignedInAuthGuard) { }

  ngOnInit(): void { }

  validateUser() {
    this.service.findUser(this.email).subscribe((data: User) => {
      if ( data != null && this.email == data.email && this.password == data.password) {
        this.authGuard.isSignedIn = true;
        this.signedAuth.isSignedIn = true;
        this.router.navigateByUrl('home').then();
      }
      else if (data != null && this.email == data.email) {
        alert("Incorrect Password!");
      }
      else {
        alert("Email doesn't exist!");
      }
    })
  }
}
