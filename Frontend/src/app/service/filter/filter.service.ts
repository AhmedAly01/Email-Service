import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filter(key: string, criteria: string, EMAILS: any) {
    const res : any = [];
    for (const email of EMAILS) {
      if (criteria === "sender") {
        if (email.fromWho.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          res.push(email);
        }
      }
      if (criteria === "subject") {
        if (email.subject.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          res.push(email);
        }
      }
      if (criteria === "receiver") {
        if (email.toWho.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          res.push(email);
        }
      }
    }

    return res;
  }

}
