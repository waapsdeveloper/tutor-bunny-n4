import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentOtherStudyMaterialComponent } from './student-other-study-material.component';

describe('StudentOtherStudyMaterialComponent', () => {
  let component: StudentOtherStudyMaterialComponent;
  let fixture: ComponentFixture<StudentOtherStudyMaterialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOtherStudyMaterialComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentOtherStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
