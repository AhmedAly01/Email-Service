import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  createUser() {
    // Here we will send a request to the back to create a new user
  }
}
