import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-service.service";
import {User} from "../user";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  EMAILS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 11;
  inbox: number[] | undefined = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    console.log("hello world from inbox");
    //// store the emails you got so as not to have to load them multiple times

    this.getPosts();
  }

  getPosts(){
    this.service.findUser(this.service.email).subscribe((data: User) => {
      this.inbox = data.inbox;
      this.service.getEmails(this.inbox!, "inbox", this.service.email!).subscribe((response: any) =>{
        this.EMAILS = response;
      });
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPosts();
  }

  deleteEmail(email: any) {
    console.log(this.EMAILS.indexOf(email));
    this.EMAILS.splice(this.EMAILS.indexOf(email),1);
    this.service.deleteEmails(this.service.email, email.id, "inbox").subscribe();
  }
}
