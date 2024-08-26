import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatRequestsPage } from './chat-requests.page';

describe('ChatRequestsPage', () => {
  let component: ChatRequestsPage;
  let fixture: ComponentFixture<ChatRequestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
