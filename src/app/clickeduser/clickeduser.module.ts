import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClickeduserPageRoutingModule } from './clickeduser-routing.module';

import { ClickeduserPage } from './clickeduser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClickeduserPageRoutingModule
  ],
  declarations: [ClickeduserPage]
})
export class ClickeduserPageModule {}
