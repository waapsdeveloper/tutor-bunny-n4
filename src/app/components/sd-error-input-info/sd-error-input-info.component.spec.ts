import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SdErrorInputInfoComponent } from './sd-error-input-info.component';

describe('SdErrorInputInfoComponent', () => {
  let component: SdErrorInputInfoComponent;
  let fixture: ComponentFixture<SdErrorInputInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SdErrorInputInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SdErrorInputInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
