import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private inbox: any;
  private sent: any;
  private trash: any;

  constructor() { }
}
