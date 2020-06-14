import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TownhallsectionPageRoutingModule } from './townhallsection-routing.module';

import { TownhallsectionPage } from './townhallsection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TownhallsectionPageRoutingModule
  ],
  declarations: [TownhallsectionPage]
})
export class TownhallsectionPageModule {}
