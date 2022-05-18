import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lumpsum } from '../interfaces/lumpsum';
import { menu_item } from '../interfaces/meal_option';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getMenu() {
    let obs = new Observable<menu_item[]>((observer) => {
      this.http
        .post<menu_item[]>('/get/menu', null, { observe: 'response' })
        .subscribe({
          next: (data) => {
            observer.next(data.body!);
          },
          error: (err) => {
            console.error(err);
          },
        });
    });
    return obs;
  }

  publishOrders(load: lumpsum) {
    let obs = new Observable<boolean>((observer) => {
      this.http
        .post<boolean>('/order/lumpsum', load, { observe: 'response' })
        .subscribe({
          next: (data) => {
            observer.next(data.body!);
          },
          error: (err) => {
            console.error(err);
            observer.next(false);
          },
        });
    });
    return obs;
  }
}
