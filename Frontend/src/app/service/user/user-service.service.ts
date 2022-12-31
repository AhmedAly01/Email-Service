import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Email} from "../../models/email/email";
import {Contact} from "../../models/contact/contact";

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
    let params = new FormData();
    params.append("draft", false as any);
    params.append("from", email.getFrom());
    params.append("to", email.getTo() as any);
    params.append("subject", email.subject as string)
    params.append("body", email.body as string)
    params.append("priority", email.priority as any);
    for(let attach of email.getAttachments()){
      params.append("attachments", attach)
      console.log(attach);
      
    }

    return this.http.post<Email>("http://localhost:8080/email/compose", params);
  }

  getEmails(ids: number[], folderName: string, email: string){
    if (ids.length == 0) return;
    return this.http.get("http://localhost:8080/email/getEmails/" + email + "/" + folderName + "/" + ids);
  }

  deleteEmails(user: string | undefined, ids: number[], folderName: string){
    return this.http.delete("http://localhost:8080/email/delete/" + user + "/" +  ids + "/" + folderName);
  }

  saveDraft(email: Email){
    let params = new FormData();
    params.append("draft", true as any);
    params.append("from", email.getFrom());
    params.append("to", email.getTo() as any);
    params.append("subject", email.subject as string)
    params.append("body", email.body as string)
    params.append("priority", email.priority as any);
    for(let attach of email.getAttachments()){
      params.append("attachments", attach)
    }             

    /////////////////////////////////////////////checkkkkkkkkkkkk pleaseeeeeeeeeeeeeeeeeeeeeeee
    return this.http.post<Email>("http://localhost:8080/email/compose", params, {reportProgress: true, responseType: 'json'});
  }

  addContact(contact: Contact) {
    return this.http.post<Contact>("http://localhost:8080/contact/add/" + this.email, contact);
  }

  getContacts(ids: number[]) {
    if (ids.length == 0) return;
    return this.http.get("http://localhost:8080/contact/get/" + ids);
  }

  deleteContacts(user: string | undefined, id: number[]){
    return this.http.delete("http://localhost:8080/contact/delete/" + user + "/" + id);
  }


  getAttachsUrl(attachIds: number[]){
    return this.http.get("http://localhost:8080/email/get/attachments/" + attachIds)
  }

  downloadAttach(attachPara: any){
    this.http.get(attachPara["url"] as string, {responseType: 'blob'}).subscribe((res: Blob) => {
      console.log(attachPara["type"]);
      
      let file = new File([res as Blob], attachPara["name"], {type: (attachPara["type"] as string).toLowerCase()})
      let a = document.createElement('a');
      console.log(file);
      
      a.href = URL.createObjectURL(file);
      a.download = attachPara["name"];
      a.click();
    }); 
  }
}
