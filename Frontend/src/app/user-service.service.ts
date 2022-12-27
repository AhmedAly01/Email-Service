import { Injectable } from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Email} from "./email";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<User> | undefined;
  email: string | undefined;


  getUser(): Observable<User> | undefined {
    return this.user;
  }

  setUser(value: Observable<User> | undefined) {
    this.user = value;
  }

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>("http://localhost:8080/user/add", user);
  }

  findUser(email: string | undefined){
    this.user = this.http.get<User>("http://localhost:8080/user/find/" + email);
    this.email = email;
    return this.user

  }

  sendEmail(email: Email){
    return this.http.post<Email>("http://localhost:8080/email/compose", email);
  }

  getPosts(){
    return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }
}
