import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScdPageCourseScheduleComponent } from './scd-page-course-schedule.component';

describe('ScdPageCourseScheduleComponent', () => {
  let component: ScdPageCourseScheduleComponent;
  let fixture: ComponentFixture<ScdPageCourseScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScdPageCourseScheduleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScdPageCourseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
