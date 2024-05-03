import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherGalleryPage } from './teacher-gallery.page';

describe('TeacherGalleryPage', () => {
  let component: TeacherGalleryPage;
  let fixture: ComponentFixture<TeacherGalleryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
