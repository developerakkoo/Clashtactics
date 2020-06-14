import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChannelmessagePage } from './channelmessage.page';

describe('ChannelmessagePage', () => {
  let component: ChannelmessagePage;
  let fixture: ComponentFixture<ChannelmessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelmessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelmessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
