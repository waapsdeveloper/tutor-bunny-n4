import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StpPageProfileStatisticsComponent } from './stp-page-profile-statistics.component';

describe('StpPageProfileStatisticsComponent', () => {
  let component: StpPageProfileStatisticsComponent;
  let fixture: ComponentFixture<StpPageProfileStatisticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StpPageProfileStatisticsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StpPageProfileStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
