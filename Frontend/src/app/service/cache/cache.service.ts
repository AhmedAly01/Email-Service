import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  inbox: any;
  sent: any;
  trash: any;
  draft: any;

  constructor() { }
}
