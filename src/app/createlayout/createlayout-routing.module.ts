import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatelayoutPage } from './createlayout.page';

const routes: Routes = [
  {
    path: '',
    component: CreatelayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatelayoutPageRoutingModule {}
