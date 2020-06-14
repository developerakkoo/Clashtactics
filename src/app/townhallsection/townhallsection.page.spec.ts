import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TownhallsectionPage } from './townhallsection.page';

describe('TownhallsectionPage', () => {
  let component: TownhallsectionPage;
  let fixture: ComponentFixture<TownhallsectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownhallsectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TownhallsectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
