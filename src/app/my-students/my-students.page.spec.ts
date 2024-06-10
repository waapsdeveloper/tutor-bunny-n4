import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyStudentsPage } from './my-students.page';

describe('MyStudentsPage', () => {
  let component: MyStudentsPage;
  let fixture: ComponentFixture<MyStudentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
