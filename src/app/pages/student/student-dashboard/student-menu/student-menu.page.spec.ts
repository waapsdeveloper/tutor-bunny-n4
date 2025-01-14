import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentMenuPage } from './student-menu.page';

describe('StudentMenuPage', () => {
  let component: StudentMenuPage;
  let fixture: ComponentFixture<StudentMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
