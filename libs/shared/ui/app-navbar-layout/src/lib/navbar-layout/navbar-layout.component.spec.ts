import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { of, Subject } from 'rxjs';
import { NavbarLayoutComponent } from './navbar-layout.component';
const UtilsServiceMock = {
  bookAppSubject$: of({ type: 'addToCart', value: '' }),
  appSubject$: new Subject(),
  modifybooksAppJson: {
    cartItems: [
      {
        id: '1',
      },
    ],
  },
};
describe('NavbarLayoutComponent', () => {
  let component: NavbarLayoutComponent;
  let fixture: ComponentFixture<NavbarLayoutComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarLayoutComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule, MaterialModule],
      providers: [
        // {
        //   provide: UtilsService,
        //   useValue: UtilsServiceMock,
        // },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    // TestBed.overrideProvider(UtilsService, { useValue: UtilsServiceMock });
    // fixture = TestBed.createComponent(NavbarLayoutComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    TestBed.overrideProvider(UtilsService, { useValue: UtilsServiceMock });
    fixture = TestBed.createComponent(NavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should display cartitems length as one', () => {
    TestBed.overrideProvider(UtilsService, { useValue: UtilsServiceMock });
    fixture = TestBed.createComponent(NavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.availableCartItem).toBe(1);
  });

  it('should check if badge is getting updated in the dom', () => {
    // fixture.detectChanges();
    TestBed.overrideProvider(UtilsService, { useValue: UtilsServiceMock });
    fixture = TestBed.createComponent(NavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const badgeEle = fixture.debugElement.query(
      By.css('.badge .mat-badge-content')
    );
    expect(badgeEle.nativeElement.textContent).toBe('1');
  });

  it('should check if subject is send with wrong params', () => {
    TestBed.overrideProvider(UtilsService, {
      useValue: {
        bookAppSubject$: of({ type: '', value: '' }),
      },
    });
    fixture = TestBed.createComponent(NavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.availableCartItem).toBe(0);
  });
});
