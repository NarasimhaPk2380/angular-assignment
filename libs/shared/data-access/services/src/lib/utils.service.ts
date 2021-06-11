import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  appSubject,
  billingAddress,
  book,
  booksApp,
} from '@buyonline/shared/data-access/models';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  appSubject$ = new Subject<appSubject>();
  booksAppJson: booksApp = {
    cartItems: [],
    myCollection: [],
    billingAddress: {},
  };

  set modifybooksAppJson(data: booksApp) {
    this.booksAppJson = { ...data };
  }
  get modifybooksAppJson(): booksApp {
    return this.booksAppJson;
  }

  get bookAppSubject$() {
    return this.appSubject$.asObservable();
  }

  addItemToCart(data: book) {
    const isItemAvailableInList = this.booksAppJson.cartItems.some(
      (book) => book.id === data.id
    );
    !isItemAvailableInList ? this.booksAppJson.cartItems.push(data) : '';
    this.appSubject$.next({ type: 'addToCart', value: '' });
  }
  deleteItemFromCart(bookId: string) {
    const itemIndex = this.booksAppJson.cartItems.findIndex(
      (book) => book.id === bookId
    );
    this.booksAppJson.cartItems.splice(itemIndex, 1);
    this.appSubject$.next({ type: 'addToCart', value: '' });
  }

  submitOrder(billingAddress: billingAddress) {
    this.booksAppJson = {
      ...this.modifybooksAppJson,
      billingAddress,
      myCollection: [...this.modifybooksAppJson.cartItems],
      cartItems: [],
    };
    this.appSubject$.next({ type: 'addToCart', value: '' });
  }
}
