import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LostItem, FoundItem } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  newLostItem$ = new BehaviorSubject<LostItem>(null);
  newFoundItem$ = new BehaviorSubject<FoundItem>(null);

  private url = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  saveLostItem(item: LostItem): Observable<LostItem> {
    return this.http.post<LostItem>(this.url + 'lostItems', item);
  }

  saveFoundItem(item: FoundItem): Observable<FoundItem> {
    return this.http.post<FoundItem>(this.url + 'foundItems', item);
  }

  getLostItems(): Observable<LostItem[]> {
    return this.http.get<LostItem[]>(this.url + 'lostItems');
  }

  getLostItem(id: number) {
    return this.http.get<LostItem>(this.url + 'lostItems/' + id);
  }

  getFoundItems(): Observable<FoundItem[]> {
    return this.http.get<FoundItem[]>(this.url + 'foundItems');
  }

  getFoundItem(id: number) {
    return this.http.get<FoundItem>(this.url + 'foundItems/' + id);
  }
}
