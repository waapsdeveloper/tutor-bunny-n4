import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavMaterialPage } from './fav-material.page';

describe('FavMaterialPage', () => {
  let component: FavMaterialPage;
  let fixture: ComponentFixture<FavMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
