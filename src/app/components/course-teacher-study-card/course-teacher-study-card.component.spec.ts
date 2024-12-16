import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourseTeacherStudyCardComponent } from './course-teacher-study-card.component';

describe('CourseTeacherStudyCardComponent', () => {
  let component: CourseTeacherStudyCardComponent;
  let fixture: ComponentFixture<CourseTeacherStudyCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherStudyCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseTeacherStudyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
