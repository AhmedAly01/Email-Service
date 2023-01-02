import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UserService} from "../service/user/user-service.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {CacheService} from "../service/cache/cache.service";
import {User} from "../models/user/user";
import {EmailService} from "../service/email/email.service";
import {Email} from "../models/email/email";
import {SortService} from "../service/sort/sort.service";
import {FilterService} from "../service/filter/filter.service";

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef<HTMLInputElement>>;
  EMAILS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  draft: number[] | undefined = [];
  reload: boolean | undefined = false;
  key: any;
  sort: any = '';
  selected: any = [];
  criteria: string = '';
  filterKey: string = '';

  constructor(private service: UserService, private emailService: EmailService, private router: Router, private authGuard: AuthGuard, private cache: CacheService, private sortService: SortService, private filterService: FilterService) { }

  ngOnInit(): void {
    if (!this.authGuard.isSignedIn) {
      this.router.navigateByUrl('').then();
    }
    this.getPosts();
  }

  getPosts(){
    if (this.cache.draft === undefined || this.reload) {
      this.service.user!.subscribe((data: User) => {
        this.draft = data.draft;
        this.service.getEmails(this.draft!, "draft", this.service.email!)?.subscribe((response: any) => {
          this.EMAILS = response;
          this.cache.draft = this.EMAILS;
        });
      });
    }
    else {
      this.EMAILS = this.cache.draft;
    }
    this.reload = false;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPosts();
    let sortFunc = this.sortService.sortFactory('dateNew');
    sortFunc(this.EMAILS);
  }

  deleteEmail(email: any, selected: boolean) {
    if (!selected) {
      this.EMAILS.splice(this.EMAILS.indexOf(email), 1);
      this.service.deleteEmails(this.service.email, email.id, "draft").subscribe();
    }
    else if (selected) {
      for (let i = 0; i < this.selected.length; i++){
        this.EMAILS.splice(this.EMAILS.indexOf(this.selected[i]), 1);
        this.selected[i] = this.selected[i].id;
      }
      this.service.deleteEmails(this.service.email, this.selected, "draft").subscribe();
      this.selected = [];
    }
  }

  openDraft(email: Email) {
    this.emailService.to = email.toWho;
    this.emailService.body = email.body;
    this.emailService.subject = email.subject;
    this.emailService.id = email.id;
    this.emailService.priority = email.importance;
    this.router.navigateByUrl('home/compose').then();
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
    let sortFunc = this.sortService.sortFactory(this.sort);
    sortFunc(this.EMAILS);
  }

  selectEmail(email: any, event: any) {
    if (event.target.checked){
      this.selected.push(email);
    }
    else {
      this.selected.splice(this.selected.indexOf(email),1);
    }
    console.log(this.selected);
  }

  filterEmails(key: string){
    this.EMAILS = this.filterService.filter(key, this.criteria, this.EMAILS);
    if (this.EMAILS === 0 || !key) {
      this.getPosts();
    }
  }

  selectAll() {
    this.selected = []
    for (let checkbox of this.checkboxes.toArray()){
      checkbox.nativeElement.checked = true;
    }
    for (let email of this.EMAILS){
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
