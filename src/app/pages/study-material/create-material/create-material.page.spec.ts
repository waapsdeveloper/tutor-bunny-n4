import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMaterialPage } from './create-material.page';

describe('CreateMaterialPage', () => {
  let component: CreateMaterialPage;
  let fixture: ComponentFixture<CreateMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
