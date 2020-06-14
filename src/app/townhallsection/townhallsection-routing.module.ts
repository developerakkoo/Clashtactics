import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TownhallsectionPage } from './townhallsection.page';

const routes: Routes = [
  {
    path: '',
    component: TownhallsectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TownhallsectionPageRoutingModule {}
