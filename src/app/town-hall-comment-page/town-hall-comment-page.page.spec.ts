import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TownHallCommentPagePage } from './town-hall-comment-page.page';

describe('TownHallCommentPagePage', () => {
  let component: TownHallCommentPagePage;
  let fixture: ComponentFixture<TownHallCommentPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownHallCommentPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TownHallCommentPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
