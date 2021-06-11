import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { book } from '@buyonline/shared/data-access/models';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartItemResolverService {
  constructor(private cartSrvc: CartService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<book> | Promise<book> {
    return this.cartSrvc.retrieveBookId(route.params.bookId);
  }
}
