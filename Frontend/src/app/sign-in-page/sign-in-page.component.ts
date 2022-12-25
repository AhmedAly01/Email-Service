import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-service.service";
import {User} from "../user";

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  validateUser() {
    this.service.findUser(this.email).subscribe((data: User) => {
      if ( data != null && this.email == data.email && this.password == data.password) {
        // we Sign the user in from here
        alert("Singed in successfully!");
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
