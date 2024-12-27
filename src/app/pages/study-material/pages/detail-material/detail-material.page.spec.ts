import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailMaterialPage } from './detail-material.page';

describe('DetailMaterialPage', () => {
  let component: DetailMaterialPage;
  let fixture: ComponentFixture<DetailMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
