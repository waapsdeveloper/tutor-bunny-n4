import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseFormPage } from './course-form.page';

describe('CourseFormPage', () => {
  let component: CourseFormPage;
  let fixture: ComponentFixture<CourseFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
