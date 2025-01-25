import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutHistoryDetailPage } from './checkout-history-detail.page';

describe('CheckoutHistoryDetailPage', () => {
  let component: CheckoutHistoryDetailPage;
  let fixture: ComponentFixture<CheckoutHistoryDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutHistoryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
