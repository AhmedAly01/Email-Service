import { Component, OnInit } from '@angular/core';
import {Contact} from "../models/contact/contact";
import {UserService} from "../service/user/user-service.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {CacheService} from "../service/cache/cache.service";

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
  CONTACTS: any;
  reload: boolean = false;

  constructor(private contact: Contact, private service: UserService, private router: Router, private authGuard: AuthGuard, private cache: CacheService) { }

  ngOnInit(): void {
    if (!this.authGuard.isSignedIn) {
      this.router.navigateByUrl('').then();
    }
    this.getContacts();
  }

  getContacts(){
    //this is where we give a get request to the back to get the contacts list
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
    this.contact = new Contact(this.name, this.emails)
    //here we put the request to post the contact to the database
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getContacts();
  }

  deleteContact(contact: any) {
    //this is where we can delete contacts from the database.
  }

  compose(email: string) {
    //this is the event when you click on a contact
  }
}
