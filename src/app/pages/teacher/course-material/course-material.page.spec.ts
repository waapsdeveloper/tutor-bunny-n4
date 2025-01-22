import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseMaterialPage } from './course-material.page';

describe('CourseMaterialPage', () => {
  let component: CourseMaterialPage;
  let fixture: ComponentFixture<CourseMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
