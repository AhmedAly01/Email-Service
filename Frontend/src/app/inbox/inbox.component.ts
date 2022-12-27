import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-service.service";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;


  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.service.getPosts().subscribe(
      (response) => {
        this.POSTS = response;
      }, (error) => {
        console.log(error)
      }
    )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPosts();
  }

}
