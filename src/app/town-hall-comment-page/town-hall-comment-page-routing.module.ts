import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TownHallCommentPagePage } from './town-hall-comment-page.page';

const routes: Routes = [
  {
    path: '',
    component: TownHallCommentPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TownHallCommentPagePageRoutingModule {}
