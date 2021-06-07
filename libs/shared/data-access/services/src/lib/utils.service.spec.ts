import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { billingAddress, book } from '@buyonline/shared/data-access/models';

function fakeFunForBookJson(
  service: UtilsService,
  cartItems: book[],
  myCollection: book[],
  billingAddress: billingAddress | {}
) {
  service.modifybooksAppJson = {
    cartItems: [...cartItems],
    myCollection: [...myCollection],
    billingAddress: { ...billingAddress },
  };
}
describe('UtilsService', () => {
  let service: UtilsService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });
  it('Should create', () => {
    expect(service).toBeTruthy();
  });
  it('Should set app data with modifybooksAppJson', () => {
    fakeFunForBookJson(service, [{ id: '1' }, { id: '2' }], [], {});
    const appJson = service.modifybooksAppJson;
    expect(appJson?.cartItems?.length).toBe(2);
  });
  it('Should get app data with modifybooksAppJson', () => {
    fakeFunForBookJson(service, [], [], { name: 'Narasimha' });
    const appJson = service.modifybooksAppJson;
    expect(appJson?.billingAddress).toStrictEqual({ name: 'Narasimha' });
  });
  it('Should get Observable data with bookAppSubject$', (done) => {
    const bookApp$ = service.bookAppSubject$;
    bookApp$.subscribe((data) => {
      expect(data).toStrictEqual({ type: 'spinner', value: false });
      done();
    });
    service.appSubject$.next({ type: 'spinner', value: false });
  });
  it('Should call addItemToCart(data: book)', () => {
    let booksList = [{ id: '1' }, { id: '3' }];
    fakeFunForBookJson(service, booksList, [], {});
    service.addItemToCart({ id: '4' });
    expect(service.booksAppJson?.cartItems?.length).toBe(3);
  });
  it('Should call deleteItemFromCart(bookId: string)', () => {
    let booksList = [{ id: '1' }, { id: '3' }];
    fakeFunForBookJson(service, booksList, [], {});
    service.deleteItemFromCart('3');
    expect(service.booksAppJson?.cartItems?.length).toBe(1);
  });

  it('Should call submitOrder(billingAddress: billingAddress)', () => {
    let booksList = [{ id: '1' }, { id: '3' }];
    fakeFunForBookJson(service, booksList, [], { name: 'Narasimha' });
    service.submitOrder({
      name: 'Narasima',
      phoneNumber: '12324234423',
      email: 'dd@gmail.com',
      address: 'hyd',
    });
    expect(service.booksAppJson?.cartItems?.length).toBe(0);
    expect(service.booksAppJson?.myCollection?.length).toBe(2);
  });
});
