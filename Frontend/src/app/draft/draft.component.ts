import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user/user-service.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {CacheService} from "../service/cache/cache.service";
import {User} from "../models/user/user";

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  EMAILS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 11;
  draft: number[] | undefined = [];
  reload: boolean | undefined = false;

  constructor(private service: UserService, private router: Router, private authGuard: AuthGuard, private cache: CacheService) { }

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
        this.service.getEmails(this.draft!, "draft", this.service.email!).subscribe((response: any) => {
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
  }

  deleteEmail(email: any) {
    this.EMAILS.splice(this.EMAILS.indexOf(email),1);
    this.service.deleteEmails(this.service.email, email.id, "draft").subscribe();
  }
}
