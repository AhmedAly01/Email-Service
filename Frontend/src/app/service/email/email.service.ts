import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  to: any = [];
  subject: any = '';
  body: any = '';

  constructor() { }
}
