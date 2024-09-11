import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursePhotossPage } from './course-photoss.page';

describe('CoursePhotossPage', () => {
  let component: CoursePhotossPage;
  let fixture: ComponentFixture<CoursePhotossPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePhotossPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
