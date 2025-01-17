import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherCreditsPage } from './teacher-credits.page';

describe('TeacherCreditsPage', () => {
  let component: TeacherCreditsPage;
  let fixture: ComponentFixture<TeacherCreditsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCreditsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
