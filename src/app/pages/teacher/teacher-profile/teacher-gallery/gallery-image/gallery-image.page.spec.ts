import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryImagePage } from './gallery-image.page';

describe('GalleryImagePage', () => {
  let component: GalleryImagePage;
  let fixture: ComponentFixture<GalleryImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
