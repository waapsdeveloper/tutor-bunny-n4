import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseHistoryDetailPage } from './purchase-history-detail.page';

describe('PurchaseHistoryDetailPage', () => {
  let component: PurchaseHistoryDetailPage;
  let fixture: ComponentFixture<PurchaseHistoryDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHistoryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
