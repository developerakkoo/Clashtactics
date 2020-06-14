import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatelayoutPageRoutingModule } from './createlayout-routing.module';

import { CreatelayoutPage } from './createlayout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatelayoutPageRoutingModule
  ],
  declarations: [CreatelayoutPage]
})
export class CreatelayoutPageModule {}
