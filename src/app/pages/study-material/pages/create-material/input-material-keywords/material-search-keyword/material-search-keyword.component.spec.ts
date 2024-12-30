import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaterialSearchKeywordComponent } from './material-search-keyword.component';

describe('MaterialSearchKeywordComponent', () => {
  let component: MaterialSearchKeywordComponent;
  let fixture: ComponentFixture<MaterialSearchKeywordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSearchKeywordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialSearchKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
