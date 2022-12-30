import { Component, OnInit } from '@angular/core';
import {Contact} from "../models/contact/contact";
import {UserService} from "../service/user/user-service.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {CacheService} from "../service/cache/cache.service";
import {User} from "../models/user/user";
import {EmailService} from "../service/email/email.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 11;
  name: string | undefined = '';
  email: string | undefined = '';
  emails: string[] | undefined = [];
  contacts: number[] | undefined = [];
  CONTACTS: any;
  reload: boolean = false;

  constructor(private service: UserService, private emailService: EmailService, private router: Router, private authGuard: AuthGuard, private cache: CacheService) { }

  ngOnInit(): void {
    if (!this.authGuard.isSignedIn) {
      this.router.navigateByUrl('').then();
    }
    this.getContacts();
  }

  getContacts(){
    if (this.cache.contacts === undefined || this.reload) {
      this.service.user!.subscribe((data: User) => {
        this.contacts = data.contacts;
        this.service.getContacts(this.contacts!)?.subscribe((response: any) => {
          this.CONTACTS = response;
          this.cache.contacts = this.CONTACTS;
        });
      });
    }
    else {
      this.CONTACTS = this.cache.contacts;
    }
    this.reload = false;
  }

  removeEmail(email: string) {
    if (this.emails?.length != 0) {
      this.emails?.splice(this.emails?.indexOf(email),1);
    }
  }

  appendEmail() {
    if (this.email?.length != 0) {
      if (this.email != null) {
        this.emails?.push(this.email);
      }
      this.email = '';
    }
  }

  addContact() {
    let contact = new Contact(this.name, this.emails)
    this.service.addContact(contact).subscribe();
    this.name = '';
    this.emails = [];
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getContacts();
  }

  deleteContact(contact: any) {
    this.CONTACTS.splice(this.CONTACTS.indexOf(contact),1);
    this.service.deleteContacts(this.service.email, contact.id).subscribe();
  }

  compose(contact: Contact) {
    this.emailService.to = contact.emails;
    this.router.navigateByUrl('home/compose').then();
  }

  renameContact(contact: any) {
    this.name = contact.name;
    this.emails = contact.emails;
    this.deleteContact(contact);
  }
}
