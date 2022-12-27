import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-service.service";
import {User} from "../user";

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  EMAILS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 11;
  sent: number[] | undefined = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.service.findUser(this.service.email).subscribe((data: User) => {
      this.sent = data.sent;
      console.log(this.sent);
      this.service.getEmails(this.sent!).subscribe((response: any) =>{
        this.EMAILS = response;
      });
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPosts();
  }

  deleteEmail(email: any) {
    this.service.deleteEmails(email.id, this.service.email, "sent");
  }
}
