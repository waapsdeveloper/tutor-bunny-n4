import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScdPageCourseStatisticsComponent } from './scd-page-course-statistics.component';

describe('ScdPageCourseStatisticsComponent', () => {
  let component: ScdPageCourseStatisticsComponent;
  let fixture: ComponentFixture<ScdPageCourseStatisticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScdPageCourseStatisticsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScdPageCourseStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
