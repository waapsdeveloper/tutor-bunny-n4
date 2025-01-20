import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutHistoryPage } from './checkout-history.page';

describe('CheckoutHistoryPage', () => {
  let component: CheckoutHistoryPage;
  let fixture: ComponentFixture<CheckoutHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
