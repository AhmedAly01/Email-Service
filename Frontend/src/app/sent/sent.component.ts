import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  emails = [
    {id: 1, name:'Superman', date:'15:00'},
    {id: 2, name:'Batman', date:'18:00'},
    {id: 5, name:'BatGirl', date:'19:00'},
    {id: 3, name:'Robin', date:'23:00'},{id: 1, name:'Superman', date:'15:00'},
    {id: 2, name:'Batman', date:'18:00'},
    {id: 5, name:'BatGirl', date:'19:00'},
    {id: 3, name:'Robin', date:'23:00'},{id: 1, name:'Superman', date:'15:00'},
    {id: 2, name:'Batman', date:'18:00'},
    {id: 5, name:'BatGirl', date:'19:00'},
    {id: 3, name:'Robin', date:'23:00'},{id: 1, name:'Superman', date:'15:00'},
    {id: 2, name:'Batman', date:'18:00'},
    {id: 5, name:'BatGirl', date:'19:00'},
    {id: 3, name:'Robin', date:'23:00'},{id: 1, name:'Superman', date:'15:00'},
    {id: 2, name:'Batman', date:'18:00'},
    {id: 5, name:'BatGirl', date:'19:00'},
    {id: 3, name:'Robin', date:'23:00'},
    {id: 4, name:'Flash', date:'20:00'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
