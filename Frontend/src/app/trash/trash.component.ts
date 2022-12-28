import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user/user-service.service";
import {User} from "../models/user/user";
import {Email} from "../models/email/email";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {CacheService} from "../service/cache/cache.service";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  EMAILS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 11;
  trash: number[] | undefined = [];
  reload: boolean | undefined;

  constructor(private service: UserService, private router: Router, private authGuard: AuthGuard, private cache: CacheService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    if (this.cache.trash === undefined || this.reload) {
      this.service.user!.subscribe((data: User) => {
        this.trash = data.deleted;
        this.service.getEmails(this.trash!, "trash", this.service.email!).subscribe((response: any) => {
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

  deleteEmail(email: any) {
    console.log(email);
  }
}
