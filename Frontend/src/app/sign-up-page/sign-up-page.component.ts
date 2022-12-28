import {Component, Injectable, OnInit} from '@angular/core';
import {User} from "../models/user/user";
import {UserService} from "../service/user/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})

@Injectable()
export class SignUpPageComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;

  constructor(private service : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {
    let user = new User(this.name, this.email, this.password);
    this.service.findUser(this.email).subscribe((data: User) => {
      if (data != null) {
        alert("Email already exists!");
      }
      else {
        this.service.createUser(user).subscribe();
        this.router.navigateByUrl('').then();
      }
    })
  }
}
