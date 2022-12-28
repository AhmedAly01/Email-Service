import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Email} from "../../models/email/email";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<User> | undefined;
  email: string | undefined;

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

  getEmails(ids: number[], folderName: string, email: string){
    return this.http.get("http://localhost:8080/email/getEmails/" + email + "/" + folderName + "/" + ids);
  }

  deleteEmails(user: string | undefined, id: number, folderName: string){
    return this.http.delete("http://localhost:8080/email/delete/" + user + "/" +  id + "/" + folderName);
  }

  saveDraft(email: Email){
    //here we post request to save the draft
    return this.http.post<Email>("http://localhost:8080/email/compose", email);
  }

}
