import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMaterialPhotosPage } from './create-material-photos.page';

describe('CreateMaterialPhotosPage', () => {
  let component: CreateMaterialPhotosPage;
  let fixture: ComponentFixture<CreateMaterialPhotosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaterialPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
