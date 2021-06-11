import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { MyCartItemsLayoutComponent } from './my-cart-items-layout.component';
class RouterStub {
  url = '';
  navigate(): void {
    return;
  }
}
describe('MyCartItemsLayoutComponent', () => {
  let component: MyCartItemsLayoutComponent;
  let fixture: ComponentFixture<MyCartItemsLayoutComponent>;
  let service: UtilsService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCartItemsLayoutComponent],
      imports: [FlexCardsLayoutModule],
      providers: [{ provide: Router, useClass: RouterStub }, UtilsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartItemsLayoutComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UtilsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check cartitems when user lands cart-items page', () => {
    service.booksAppJson.cartItems = [{ id: '1' }, { id: '2' }, { id: '3' }];
    fixture.detectChanges();
    expect(component.cartItemsList).toEqual(
      service?.modifybooksAppJson?.cartItems
    );
  });

  it('should show cartItems is empty when there are no cart items', () => {
    service.booksAppJson.cartItems = [];
    fixture.detectChanges();
    const emptyEle = fixture.debugElement.query(By.css('#empty'));
    expect(emptyEle.nativeElement.textContent).toBe('Cart is empty');
  });
});
