import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentProfileEditPage } from './student-profile-edit.page';

describe('StudentProfileEditPage', () => {
  let component: StudentProfileEditPage;
  let fixture: ComponentFixture<StudentProfileEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
