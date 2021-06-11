import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { book } from '@buyonline/shared/data-access/models';
import {
  CartService,
  UtilsService,
} from '@buyonline/shared/data-access/services';
import { Observable, of } from 'rxjs';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { SearchLayoutComponent } from './search-layout.component';
import { switchMap } from 'rxjs/operators';
import { By } from '@angular/platform-browser';

class RouterStub {
  url = '';
  navigate() {
    return;
  }
}
class CartServiceMock {
  searchBooks(txt$: Observable<string>): Observable<Array<book>> {
    return txt$.pipe(
      switchMap((searchTxt) => {
        return searchTxt ? of([{ id: '1' }, { id: '2' }]) : of([{ id: '1' }]);
      })
    );
  }
}

describe('SearchLayoutComponent', () => {
  let component: SearchLayoutComponent;
  let fixture: ComponentFixture<SearchLayoutComponent>;
  const UtilsServiceMock = {
    bookAppSubject$: of({ type: 'spinner', value: false }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchLayoutComponent],
      imports: [BrowserAnimationsModule, FlexCardsLayoutModule, MaterialModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: CartService,
          useClass: CartServiceMock,
        },
        {
          provide: UtilsService,
          useValue: UtilsServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner false on init', () => {
    expect(component.spinner).toBeFalsy();
  });

  it('should display booksList count as one', () => {
    component.bookSearchText$.next('');
    expect(component.booksList?.length).toBe(1);
  });

  it('should display booksList count as two', () => {
    component.bookSearchText$.next('bn');
    expect(component.booksList?.length).toBe(2);
  });

  it('check if searchtext observable is invoked when input is updated', () => {
    const inputElement = fixture.debugElement.query(By.css('#searchInput'));
    inputElement.nativeElement.value = 'hjhj';
    inputElement.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'a' })
    );
    expect(component.booksList?.length).toBe(2);
  });
});

describe('SearchLayoutComponent for else part test', () => {
  let component: SearchLayoutComponent;
  let fixture: ComponentFixture<SearchLayoutComponent>;
  const UtilsServiceMock = {
    bookAppSubject$: of({ type: '', value: false }),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchLayoutComponent],
      imports: [BrowserAnimationsModule, FlexCardsLayoutModule, MaterialModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: CartService,
          useClass: CartServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(UtilsService, { useValue: UtilsServiceMock });
    fixture = TestBed.createComponent(SearchLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(CartService);
    fixture.detectChanges();
  });
  it('check if spinner observable is sent wrong type', (done) => {
    component.spinner.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });
});
