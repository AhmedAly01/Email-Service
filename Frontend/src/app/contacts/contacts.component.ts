import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Contact} from "../models/contact/contact";
import {UserService} from "../service/user/user-service.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {CacheService} from "../service/cache/cache.service";
import {User} from "../models/user/user";
import {EmailService} from "../service/email/email.service";
import {SortService} from "../service/sort/sort.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef<HTMLInputElement>>;
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  name: string | undefined = '';
  email: string | undefined = '';
  emails: string[] | undefined = [];
  contacts: number[] | undefined = [];
  CONTACTS: any;
  reload: boolean = false;
  sort: string = '';
  key: string = '';
  selected: any = [];

  constructor(private service: UserService, private emailService: EmailService, private router: Router, private authGuard: AuthGuard, private cache: CacheService, private sortService: SortService) { }

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

  deleteContact(email: any, selected: boolean) {
    if (!selected) {
      this.CONTACTS.splice(this.CONTACTS.indexOf(email), 1);
      this.service.deleteContacts(this.service.email, email.id).subscribe();
    }
    else if (selected) {
      for (let i = 0; i < this.selected.length; i++){
        this.CONTACTS.splice(this.CONTACTS.indexOf(this.selected[i]), 1);
        this.selected[i] = this.selected[i].id;
      }
      this.service.deleteContacts(this.service.email, this.selected).subscribe();
      this.selected = [];
    }
  }

  compose(contact: Contact) {
    this.emailService.to = contact.emails;
    this.router.navigateByUrl('home/compose').then();
  }

  renameContact(contact: any) {
    this.name = contact.name;
    this.emails = contact.emails;
    this.deleteContact(contact, false);
  }

  search(key: any) {
    const res : any = [];
    for (const contact of this.CONTACTS) {
      if (contact.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||  contact.emails.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        res.push(contact);
      }
    }
    this.CONTACTS = res;
    if (res.length === 0 || !key) {
      this.getContacts()
    }
  }

  sortContacts() {
    let sortFunc = this.sortService.sortFactory(this.sort);
    sortFunc(this.CONTACTS);
  }

  selectContact(contact: any, event: any) {
    if (event.target.checked){
      this.selected.push(contact);
    }
    else {
      this.selected.splice(this.selected.indexOf(contact),1);
    }
    console.log(this.selected);
  }

  selectAll() {
    this.selected = []
    for (let checkbox of this.checkboxes.toArray()){
      checkbox.nativeElement.checked = true;
    }
    for (let email of this.CONTACTS){
      this.selected.push(email);
    }
  }

  unselectAll() {
    this.selected = [];
    for (let checkbox of this.checkboxes.toArray()){
      checkbox.nativeElement.checked = false;
    }
  }
}
