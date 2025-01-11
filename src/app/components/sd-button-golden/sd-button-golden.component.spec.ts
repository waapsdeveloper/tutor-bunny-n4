import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SdButtonGoldenComponent } from './sd-button-golden.component';

describe('SdButtonGoldenComponent', () => {
  let component: SdButtonGoldenComponent;
  let fixture: ComponentFixture<SdButtonGoldenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SdButtonGoldenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SdButtonGoldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
