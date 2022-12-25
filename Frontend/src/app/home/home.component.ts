import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../guards/auth.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authGuard: AuthGuard) { }

  ngOnInit(): void {}


}
