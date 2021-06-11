import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckoutLayoutComponent } from './checkout-layout.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { By } from '@angular/platform-browser';
import { UtilsService } from '@buyonline/shared/data-access/services';
// class RouterStub {
//   url = '';
//   navigate(commands: any[], extras?: any) {}
// }
describe('CheckoutLayoutComponent', () => {
  let component: CheckoutLayoutComponent;
  let fixture: ComponentFixture<CheckoutLayoutComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let service: UtilsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutLayoutComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        MatSnackBar,
        UtilsService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(MatSnackBar);
    service = TestBed.inject(UtilsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkout form invalid when empty', () => {
    expect(component.checkoutForm.valid).toBeFalsy();
  });

  it('Name field validity', () => {
    let errors;
    const name = component.checkoutForm.controls['name'];
    expect(name.valid).toBeFalsy();

    // Name field is required
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();

    name.setValue('naras');
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('Phone number validity', () => {
    let errors;
    const phNum = component.checkoutForm.controls['phoneNumber'];
    expect(phNum.valid).toBeFalsy();

    // Phone number field is required
    errors = phNum.errors || {};
    expect(errors['required']).toBeTruthy();

    phNum.setValue('as');
    errors = phNum.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    phNum.setValue('1234567891');
    errors = phNum.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });
  it('email field validity', () => {
    let errors;
    const email = component.checkoutForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    // Set email to something correct
    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('should not click submitOrder when form is invalid', () => {
    component.checkoutForm.setValue({
      name: 'asdad',
      email: 'asdadgmail.com',
      phoneNumber: '1234567891',
      address: 'asdad',
    });
    const buttonElement = fixture.debugElement.query(
      By.css('.btn-submit-order')
    );
    expect(buttonElement.nativeElement.getAttribute('disabled')).toBe('true');
  });

  it('should click submitOrder and check mycollection updated', () => {
    component.checkoutForm.setValue({
      name: 'asdad',
      email: 'asdad@gmail.com',
      phoneNumber: '1234567891',
      address: 'asdad',
    });
    fixture.detectChanges();
    service.modifybooksAppJson.cartItems = [{ id: '1' }];
    const buttonElement = fixture.debugElement.query(
      By.css('.btn-submit-order')
    );
    buttonElement.nativeElement.click();
    expect(service.modifybooksAppJson?.myCollection?.length).toBe(1);
  });
  it('should click submitOrder and check mycollection updated', (done) => {
    component.checkoutForm.setValue({
      name: 'asdad',
      email: 'asdad@gmail.com',
      phoneNumber: '1234567891',
      address: 'asdad',
    });
    fixture.detectChanges();
    service.modifybooksAppJson.cartItems = [{ id: '1' }];
    const buttonElement = fixture.debugElement.query(
      By.css('.btn-submit-order')
    );
    buttonElement.nativeElement.click();
    component.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
      expect(mockRouter.navigate).toBeCalledWith(['/my-collection']);
      done();
    });
    component.snackBar._openedSnackBarRef?.dismissWithAction();
    expect(service.modifybooksAppJson?.myCollection?.length).toBe(1);
  });
});
