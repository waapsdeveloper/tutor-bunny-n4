import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleBasePage } from './role-base.page';

describe('RoleBasePage', () => {
  let component: RoleBasePage;
  let fixture: ComponentFixture<RoleBasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleBasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
