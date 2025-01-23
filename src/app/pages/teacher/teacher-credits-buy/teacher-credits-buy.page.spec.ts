import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherCreditsBuyPage } from './teacher-credits-buy.page';

describe('TeacherCreditsBuyPage', () => {
  let component: TeacherCreditsBuyPage;
  let fixture: ComponentFixture<TeacherCreditsBuyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCreditsBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
