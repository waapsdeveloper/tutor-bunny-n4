import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryIamgePage } from './gallery-iamge.page';

describe('GalleryIamgePage', () => {
  let component: GalleryIamgePage;
  let fixture: ComponentFixture<GalleryIamgePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryIamgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
