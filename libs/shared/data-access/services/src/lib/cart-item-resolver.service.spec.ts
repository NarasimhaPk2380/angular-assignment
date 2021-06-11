import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
} from '@angular/router';
import { of } from 'rxjs';

import { CartItemResolverService } from './cart-item-resolver.service';
import { CartService } from './cart.service';

class CartServiceMock {
  retrieveBookId(bookId: string) {
    return of({ bookId });
  }
}

fdescribe('CartItemResolverService', () => {
  let resolver: CartItemResolverService;
  let service: CartService;
  let route: ActivatedRoute;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartItemResolverService,
        [
          {
            provide: CartService,
            useClass: CartServiceMock,
          },
        ],
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                bookId: '1',
              },
            },
          },
        },
      ],
    });
  });

  beforeEach(() => {
    resolver = TestBed.inject(CartItemResolverService);
    service = TestBed.inject(CartService);
    route = TestBed.get(ActivatedRoute);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call retrieveBookId for getting the bookdetails', () => {
    spyOn(service, 'retrieveBookId').and.callThrough();
    resolver.resolve(route.snapshot);
    expect(service.retrieveBookId).toHaveBeenCalled();
  });
});
