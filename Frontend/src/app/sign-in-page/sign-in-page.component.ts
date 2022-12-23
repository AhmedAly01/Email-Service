import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  validateUser() {
    alert("my Email is " + this.email + " my password is " + this.password);
    // here we will send a request to the backend to make sure email and password match a current user
  }
}
