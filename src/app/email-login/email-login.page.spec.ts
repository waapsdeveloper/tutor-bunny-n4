import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailLoginPage } from './email-login.page';

describe('EmailLoginPage', () => {
  let component: EmailLoginPage;
  let fixture: ComponentFixture<EmailLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
