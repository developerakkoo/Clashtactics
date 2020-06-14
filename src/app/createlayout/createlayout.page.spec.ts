import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatelayoutPage } from './createlayout.page';

describe('CreatelayoutPage', () => {
  let component: CreatelayoutPage;
  let fixture: ComponentFixture<CreatelayoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelayoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatelayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
