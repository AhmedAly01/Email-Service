import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user/user-service.service";
import {User} from "../models/user/user";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {CacheService} from "../service/cache/cache.service";
import {SortService} from "../service/sort/sort.service";
import {FilterService} from "../service/filter/filter.service";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  EMAILS: any;
  email: any = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 11;
  inbox: number[] | undefined = [];
  reload: boolean | undefined = false;
  key: any;
  sort: any = '';
  attachments: any;
  selected: any = [];
  criteria: string = '';
  filterKey: string = '';

  constructor(private service: UserService, private router: Router, private authGuard: AuthGuard, private cache: CacheService, private sortService: SortService, private filterService: FilterService) { }

  ngOnInit(): void {
    if (!this.authGuard.isSignedIn) {
      this.router.navigateByUrl('').then();
    }
    this.getPosts();
  }

  ngOnChanges(){
    if (this.filterKey == '') this.getPosts();
  }

  getPosts(){
    if (this.cache.inbox === undefined || this.reload) {
      this.service.user!.subscribe((data: User) => {
        this.inbox = data.inbox;
        this.service.getEmails(this.inbox!, "inbox", this.service.email!)?.subscribe((response: any) => {
          this.EMAILS = response;
          this.cache.inbox = this.EMAILS;
        });
      });
    }
    else {
      this.EMAILS = this.cache.inbox;
    }
    this.reload = false;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPosts();
  }

  deleteEmail(email: any, selected: boolean) {
    if (!selected) {
      this.EMAILS.splice(this.EMAILS.indexOf(email), 1);
      this.service.deleteEmails(this.service.email, email.id, "inbox").subscribe();
    }
    else if (selected) {
      for (let i = 0; i < this.selected.length; i++){
        this.EMAILS.splice(this.EMAILS.indexOf(this.selected[i]), 1);
        this.selected[i] = this.selected[i].id;
      }
      this.service.deleteEmails(this.service.email, this.selected, "inbox").subscribe();
      this.selected = [];
    }
  }

  popUp(email: any) {
    this.email = email;
    this.service.getAttachsUrl(this.email.attachments).subscribe((res) =>{
      this.attachments = res;
    });
    document.getElementById('light')!.style.display='block';
    document.getElementById('fade')!.style.display='block';
  }

  close(){
    document.getElementById('light')!.style.display='none';
    document.getElementById('fade')!.style.display='none';
  }

  search(key: any) {
    const res : any = [];
    for (const email of this.EMAILS) {
      if (email.toWho.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||  email.subject.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||  email.body.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||  email.date.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        res.push(email);
      }
    }
    this.EMAILS = res;
    if (res.length === 0 || !key) {
      this.getPosts();
    }
  }

  sortEmails() {
    this.sortService.sortFactory(this.sort, this.EMAILS);
  }

  downloadAttachment(attachment: any){
      this.service.downloadAttach(attachment);
  }

  selectEmail(email: any, event: any) {
    if (event.target.checked){
      this.selected.push(email);
    }
    else {
      this.selected.splice(this.selected.indexOf(email),1);
    }
  }

  filterEmails(key: string){
    this.EMAILS = this.filterService.filter(key, this.criteria, this.EMAILS);
    if (this.EMAILS === 0 || !key) {
      this.getPosts();
    }
  }

}
