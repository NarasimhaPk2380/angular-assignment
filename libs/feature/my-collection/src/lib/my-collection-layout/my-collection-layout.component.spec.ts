import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { MyCollectionLayoutComponent } from './my-collection-layout.component';

class RouterStub {
  url = '';
  navigate() {
    return;
  }
}

describe('MyCollectionLayoutComponent', () => {
  let component: MyCollectionLayoutComponent;
  let fixture: ComponentFixture<MyCollectionLayoutComponent>;
  let service: UtilsService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCollectionLayoutComponent],
      imports: [FlexCardsLayoutModule],
      providers: [{ provide: Router, useClass: RouterStub }, UtilsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionLayoutComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UtilsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check mycollection when user lands mycollection page', () => {
    service.booksAppJson.myCollection = [{ id: '1' }, { id: '2' }, { id: '3' }];
    fixture.detectChanges();
    expect(component.myCollectionList).toEqual(
      service?.modifybooksAppJson?.myCollection
    );
  });

  it('should show collection is empty when there are no collection items', () => {
    service.booksAppJson.myCollection = [];
    fixture.detectChanges();
    const emptyEle = fixture.debugElement.query(By.css('#empty'));
    expect(emptyEle.nativeElement.textContent).toBe('Collection is empty');
  });
});
