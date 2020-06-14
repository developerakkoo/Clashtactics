import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelmessagePageRoutingModule } from './channelmessage-routing.module';

import { ChannelmessagePage } from './channelmessage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelmessagePageRoutingModule
  ],
  declarations: [ChannelmessagePage]
})
export class ChannelmessagePageModule {}
