import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputMaterialKeywordsComponent } from './input-material-keywords.component';

describe('InputMaterialKeywordsComponent', () => {
  let component: InputMaterialKeywordsComponent;
  let fixture: ComponentFixture<InputMaterialKeywordsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMaterialKeywordsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputMaterialKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
