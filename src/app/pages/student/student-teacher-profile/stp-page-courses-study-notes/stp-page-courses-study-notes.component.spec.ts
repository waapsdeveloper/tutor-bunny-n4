import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StpPageCoursesStudyNotesComponent } from './stp-page-courses-study-notes.component';

describe('StpPageCoursesStudyNotesComponent', () => {
  let component: StpPageCoursesStudyNotesComponent;
  let fixture: ComponentFixture<StpPageCoursesStudyNotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StpPageCoursesStudyNotesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StpPageCoursesStudyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
