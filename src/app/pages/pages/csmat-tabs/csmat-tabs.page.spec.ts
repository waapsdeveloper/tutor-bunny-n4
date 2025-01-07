import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CsmatTabsPage } from './csmat-tabs.page';

describe('CsmatTabsPage', () => {
  let component: CsmatTabsPage;
  let fixture: ComponentFixture<CsmatTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CsmatTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
