import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sortFactory(sortType: string){
    switch(sortType){
      case 'dateNew':
        return function(EMAILS: any){EMAILS.sort((a:any, b:any) => (a.date > b.date ? -1 : 1));};

      case 'dateOld':
        return function(EMAILS: any){EMAILS.sort((a:any, b:any) => (a.date < b.date ? -1 : 1));}
      
      case 'priority':
        return function(EMAILS: any){EMAILS.sort((a:any, b:any) => (a.importance < b.importance ? -1 : 1));}
      
      case 'sender':
        return function(EMAILS: any){EMAILS.sort((a:any, b:any) => (a.fromWho < b.fromWho ? -1 : 1));}
      
      case 'subject':
        return function(EMAILS: any){EMAILS.sort((a: any, b: any) => (a.subject < b.subject ? -1 : 1));}
      
      case 'body':
        return function(EMAILS: any){EMAILS.sort((a: any, b: any) => (a.body < b.body ? -1 : 1));}
      
      case 'ascending':
        return function(EMAILS: any){EMAILS.sort((a: any, b: any) => (a.name < b.name ? -1 : 1));}
      
      case 'descending':
        return function(EMAILS: any){EMAILS.sort((a: any, b: any) => (a.name > b.name ? -1 : 1));}
      
      default:
        return function(EMAILS: any){};
    }
  }

}
