import { TestBed } from '@angular/core/testing';
import { appSubject } from '@buyonline/shared/data-access/models';
import { CartService } from './cart.service';
import { ApiService } from './api.service';
import { from, of, Subject } from 'rxjs';
import { UtilsService } from './utils.service';

const UtilsServiceMock = {
  appSubject$: new Subject<appSubject>(),
};
const ApiServiceMock = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiRequest(method: string, body?: any) {
    if (!body?.id) {
      return from([
        { id: '12', items: [{ volumeInfo: { title: 'Angular' } }] },
      ]);
    } else {
      return of({ id: '12' });
    }
  },
};

describe('CartService', () => {
  let service: CartService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: ApiServiceMock,
        },
        {
          provide: UtilsService,
          useValue: UtilsServiceMock,
        },
      ],
    });
    service = TestBed.inject(CartService);
  });
  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should get the book object if user searchs with bookId', () => {
    const book$ = service.retrieveBookId('12');
    book$.subscribe((data) => {
      expect(data?.id).toBe('12');
    });
  });

  it('Should get the list when user searchs with the random text', (done) => {
    const book$ = service.searchBooks(of('ang'));
    book$.subscribe((data) => {
      expect(data?.length).toBe(1);
      done();
    });
  });
  it('Should get the empty when searchtext is empty', (done) => {
    const book$ = service.searchBooks(of(''));
    book$.subscribe((data) => {
      expect(data?.length).toBe(0);
      done();
    });
  });
});
