import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsByStudentPage } from './reviews-by-student.page';

describe('ReviewsByStudentPage', () => {
  let component: ReviewsByStudentPage;
  let fixture: ComponentFixture<ReviewsByStudentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsByStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
