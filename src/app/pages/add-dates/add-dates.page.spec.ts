import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDatesPage } from './add-dates.page';

describe('AddDatesPage', () => {
  let component: AddDatesPage;
  let fixture: ComponentFixture<AddDatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
