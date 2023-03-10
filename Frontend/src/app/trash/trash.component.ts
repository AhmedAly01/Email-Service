import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UserService} from "../service/user/user-service.service";
import {User} from "../models/user/user";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {CacheService} from "../service/cache/cache.service";
import {SortService} from "../service/sort/sort.service";
import {FilterService} from "../service/filter/filter.service";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef<HTMLInputElement>>;
  EMAILS: any;
  email: any = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  trash: number[] | undefined = [];
  reload: boolean | undefined;
  key: any;
  sort: any = '';
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

  getPosts(){
    if (this.cache.trash === undefined || this.reload) {
      this.service.user!.subscribe((data: User) => {
        this.trash = data.deleted;
        this.service.getEmails(this.trash!, "trash", this.service.email!)?.subscribe((response: any) => {
          this.EMAILS = response;
          this.cache.trash = this.EMAILS;
        });
      });
    }
    else {
      this.EMAILS = this.cache.trash;
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
      this.service.deleteEmails(this.service.email, email.id, "trash").subscribe();
    }
    else if (selected) {
      for (let i = 0; i < this.selected.length; i++){
        this.EMAILS.splice(this.EMAILS.indexOf(this.selected[i]), 1);
        this.selected[i] = this.selected[i].id;
      }
      this.service.deleteEmails(this.service.email, this.selected, "trash").subscribe();
      this.selected = [];
    }
  }

  popUp(email: any) {
    this.email = email;
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
      if (email.fromWho.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || email.toWho.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
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
  }

  filterEmails(key: string){
    this.EMAILS = this.filterService.filter(key, this.criteria, this.EMAILS);
    if (this.EMAILS === 0 || !key) {
      this.getPosts();
    }
  }

  recoverEmails(email: any, selected: boolean){
    if (selected) {
      for (let i = 0; i < this.selected.length; i++) {
        this.EMAILS.splice(this.EMAILS.indexOf(this.selected[i]), 1);
        this.selected[i] = this.selected[i].id;
      }
      this.service.recoverEmails(this.selected, this.service.email!).subscribe();
    }
    else {
      let arr : number[] = [email.id];
      this.EMAILS.splice(this.EMAILS.indexOf(email), 1);
      this.service.recoverEmails(arr, this.service.email!).subscribe();
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
