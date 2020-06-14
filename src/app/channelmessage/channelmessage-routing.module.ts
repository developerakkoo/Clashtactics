import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelmessagePage } from './channelmessage.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelmessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelmessagePageRoutingModule {}
