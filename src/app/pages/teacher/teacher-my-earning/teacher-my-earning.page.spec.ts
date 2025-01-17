import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherMyEarningPage } from './teacher-my-earning.page';

describe('TeacherMyEarningPage', () => {
  let component: TeacherMyEarningPage;
  let fixture: ComponentFixture<TeacherMyEarningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMyEarningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
