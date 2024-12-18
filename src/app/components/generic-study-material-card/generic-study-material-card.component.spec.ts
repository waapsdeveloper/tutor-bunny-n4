import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenericStudyMaterialCardComponent } from './generic-study-material-card.component';

describe('GenericStudyMaterialCardComponent', () => {
  let component: GenericStudyMaterialCardComponent;
  let fixture: ComponentFixture<GenericStudyMaterialCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericStudyMaterialCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericStudyMaterialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
