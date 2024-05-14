import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SdDailcodeBoxComponent } from './sd-dailcode-box.component';

describe('SdDailcodeBoxComponent', () => {
  let component: SdDailcodeBoxComponent;
  let fixture: ComponentFixture<SdDailcodeBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SdDailcodeBoxComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SdDailcodeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
