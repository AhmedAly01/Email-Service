import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sortFactory(sortType: string, EMAILS: any){
    if (sortType === 'dateNew') {
      EMAILS.sort((a:any, b:any) => (a.date < b.date ? -1 : 1));
    }
    else if (sortType === 'dateOld'){
      EMAILS.sort((a:any, b:any) => (a.date > b.date ? -1 : 1));
    }
    else if (sortType === 'sender') {
      EMAILS.sort((a:any, b:any) => (a.fromWho < b.fromWho ? -1 : 1));
    }
    else if (sortType === 'subject') {
      EMAILS.sort((a: any, b: any) => (a.subject < b.subject ? -1 : 1));
    }
    else if (sortType === 'body') {
      EMAILS.sort((a: any, b: any) => (a.body < b.body ? -1 : 1));
    }
  }

}
