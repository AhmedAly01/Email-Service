import {Component, OnInit} from '@angular/core';
import {Email} from "../models/email/email";
import {UserService} from "../service/user/user-service.service";
import {EmailService} from "../service/email/email.service";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  from: string | undefined;
  to: string | undefined;
  receivers: string[] | undefined = [];
  subject: string | undefined;
  body: string | undefined;
  attachments: File[] | undefined = [];
  priority: any = "0";
  fileName: string = '';
  files: string[] | undefined = [];
  id: any;

  constructor(private service: UserService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.receivers = this.emailService.to;
    this.body = this.emailService.body;
    this.subject = this.emailService.subject;
    this.id = this.emailService.id;
  }

  onFileSelected(event : any) {

    let file: any = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.files?.push(file.name);
      this.attachments?.push(file);
    }
    
    
  }

  sendEmail(){
    this.from = this.service.email;
    let email = new Email(this.from, this.receivers, this.subject, new Date(), this.body, this.attachments, 10);
    if(this.id > 0){
      email.setId(this.id);
    }
    this.service.sendEmail(email).subscribe();
    alert("Sent Successfully!");
  }

  appendReceiver() {
    if (this.to?.length != 0) {
      if (this.to != null) {
        this.receivers?.push(this.to);
      }
      this.to = '';
    }
  }

  removeReceiver(receiver: string) {
    if (this.to != null) {
      this.receivers?.splice(this.receivers?.indexOf(receiver),1);
    }
  }

  saveDraft() {
    this.from = this.service.email;
    let email = new Email(this.from, this.receivers, this.subject, new Date(), this.body, this.attachments, 10);
    this.service.saveDraft(email).subscribe();
    alert("Saved Draft!");
  }
}
