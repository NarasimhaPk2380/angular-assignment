import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { StarRatingModule } from '@buyonline/shared/pipes/star-rating';
import { of } from 'rxjs';

import { CartDetailsLayoutComponent } from './cart-details-layout.component';

class ActivatedRouteStub {
  data = of([{ id: '12', volumeInfo: { publisher: 'abc' } }]);
}

describe('CartDetailsLayoutComponent', () => {
  let component: CartDetailsLayoutComponent;
  let fixture: ComponentFixture<CartDetailsLayoutComponent>;
  let debugElement: DebugElement;
  let utilsSrvc: UtilsService;
  let acRoute: ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDetailsLayoutComponent],
      imports: [StarRatingModule],
      providers: [
        UtilsService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsLayoutComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    acRoute = TestBed.inject(ActivatedRoute);
    utilsSrvc = TestBed.inject(UtilsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click addToCart and check count of cartItems', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.add-to-cart'));
    buttonElement.nativeElement.click();
    expect(utilsSrvc.booksAppJson?.cartItems?.length).toBe(1);
  });

  it('should add the items to the cart when user clicks buy', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.checkout'));
    buttonElement.nativeElement.click();
    expect(utilsSrvc.booksAppJson?.cartItems?.length).toBe(1);
  });

  it('should check all star-doted when rating is zero', () => {
    spyOn(acRoute, 'data').and.returnValue(
      of([{ id: '12', volumeInfo: { rating: 2 } }])
    );
    fixture.detectChanges();
    console.log(component.bookDetailsJson);
    const ratingEle = fixture.debugElement.queryAll(
      By.css('.rating button span')
    );
    // console.log(ratingEle.length);
    expect(ratingEle).toBe('abc');
  });
  it('should check publisher is rendered', () => {
    fixture.detectChanges();
    const ratingEle = fixture.debugElement.query(By.css('.publisher'));
    expect(ratingEle.nativeElement.textContent).toBe('abc');
  });
});
