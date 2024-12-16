import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMaterialPage } from './list-material.page';

describe('ListMaterialPage', () => {
  let component: ListMaterialPage;
  let fixture: ComponentFixture<ListMaterialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
