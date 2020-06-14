import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatepostPage } from './createpost.page';

describe('CreatepostPage', () => {
  let component: CreatepostPage;
  let fixture: ComponentFixture<CreatepostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatepostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
