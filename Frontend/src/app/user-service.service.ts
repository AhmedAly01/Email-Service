import { Injectable } from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>("http://localhost:8080/user/add", user);
  }

  findUser(email: string | undefined){
    return this.http.get<User>("http://localhost:8080/user/find/" + email);
  }

  getPosts(){
    return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }
}
