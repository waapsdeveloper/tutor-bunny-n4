import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavCoursesPage } from './fav-courses.page';

describe('FavCoursesPage', () => {
  let component: FavCoursesPage;
  let fixture: ComponentFixture<FavCoursesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
