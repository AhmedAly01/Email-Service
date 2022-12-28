import { UserService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  
  trash: number[] | undefined = [];
  EMAILS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 11;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.service.findUser(this.service.email).subscribe((data: User) => {
      this.trash = data.sent;
      console.log(this.trash);
      this.service.getEmails(this.trash!, "trash", this.service.email!).subscribe((response: any) =>{
        this.EMAILS = response;
        console.log(response);
        
      });
    });
  }

}
