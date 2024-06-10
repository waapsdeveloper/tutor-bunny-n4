import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailRequestsPage } from './trail-requests.page';

describe('TrailRequestsPage', () => {
  let component: TrailRequestsPage;
  let fixture: ComponentFixture<TrailRequestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
