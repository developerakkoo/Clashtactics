import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutCommentPageRoutingModule } from './layout-comment-routing.module';

import { LayoutCommentPage } from './layout-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutCommentPageRoutingModule
  ],
  declarations: [LayoutCommentPage]
})
export class LayoutCommentPageModule {}
