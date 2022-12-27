import { Component, OnInit } from '@angular/core';
import {Email} from "../email";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  from: string | undefined;
  to: string[] | undefined;
  subject: string | undefined;
  date: object | undefined;
  body: string | undefined;
  attachments: object[] | undefined;
  priority: number | undefined;
  fileName: string = '';
  files: string[] | undefined = [];

  constructor() { }

  ngOnInit(): void {}

  onFileSelected(event : any) {

    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.files?.push(file.name);
      this.attachments?.push(file);
    }
  }

  sendEmail(){

  }
}
