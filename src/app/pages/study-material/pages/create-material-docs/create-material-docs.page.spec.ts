import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMaterialDocsPage } from './create-material-docs.page';

describe('CreateMaterialDocsPage', () => {
  let component: CreateMaterialDocsPage;
  let fixture: ComponentFixture<CreateMaterialDocsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaterialDocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
