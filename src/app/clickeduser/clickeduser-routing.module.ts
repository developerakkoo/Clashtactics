import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClickeduserPage } from './clickeduser.page';

const routes: Routes = [
  {
    path: '',
    component: ClickeduserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClickeduserPageRoutingModule {}
