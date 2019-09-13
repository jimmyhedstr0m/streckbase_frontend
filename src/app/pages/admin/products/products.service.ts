import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "./../../../../environments/environment";
import { Item } from "./../../../types/item";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.apiUrl}/items?limit=1000`);
  }

  updateItem(item: Item, isNew: boolean): Observable<Item> {
    if (isNew) {
      return this.http.post<Item>(`${environment.apiUrl}/items`, item);
    } else {
      return this.http.put<Item>(`${environment.apiUrl}/items/${item.id}`, item);
    }
  }

  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(`${environment.apiUrl}/items/${item.id}`);
  }
}