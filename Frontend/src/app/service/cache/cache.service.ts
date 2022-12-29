import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  user: any;
  inbox: any;
  sent: any;
  trash: any;
  draft: any;
  contacts: any;

  constructor() { }
}
