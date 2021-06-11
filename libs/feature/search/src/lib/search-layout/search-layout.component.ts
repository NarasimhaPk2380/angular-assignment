import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import {
  UtilsService,
  CartService,
} from '@buyonline/shared/data-access/services';
import { appSubject, book } from '@buyonline/shared/data-access/models';

@Component({
  selector: 'buyonline-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
})
export class SearchLayoutComponent implements OnInit, OnDestroy {
  booksList: Array<book> = [];
  bookSearchText$ = new Subject<string>();
  booksSubscription: Subscription = new Subscription();
  spinner!: Observable<boolean>;
  constructor(
    private cartSrvc: CartService,
    private utilsSrvc: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.booksSubscription = this.cartSrvc
      .searchBooks(this.bookSearchText$)
      .subscribe((booksResponse: Array<book>) => {
        this.booksList = booksResponse;
      });
    this.utilsSrvc.bookAppSubject$.subscribe((event: appSubject) => {
      if (event.type === 'spinner') {
        this.spinner = event.value;
      } else {
        this.spinner = of(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
