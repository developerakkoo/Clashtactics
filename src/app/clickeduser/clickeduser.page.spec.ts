import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClickeduserPage } from './clickeduser.page';

describe('ClickeduserPage', () => {
  let component: ClickeduserPage;
  let fixture: ComponentFixture<ClickeduserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickeduserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClickeduserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
