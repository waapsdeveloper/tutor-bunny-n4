import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreSplashPage } from './pre-splash.page';

describe('PreSplashPage', () => {
  let component: PreSplashPage;
  let fixture: ComponentFixture<PreSplashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
