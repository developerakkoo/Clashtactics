import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TownHallCommentPagePageRoutingModule } from './town-hall-comment-page-routing.module';

import { TownHallCommentPagePage } from './town-hall-comment-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TownHallCommentPagePageRoutingModule
  ],
  declarations: [TownHallCommentPagePage]
})
export class TownHallCommentPagePageModule {}
