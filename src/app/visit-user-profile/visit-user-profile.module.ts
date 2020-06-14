import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitUserProfilePageRoutingModule } from './visit-user-profile-routing.module';

import { VisitUserProfilePage } from './visit-user-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitUserProfilePageRoutingModule
  ],
  declarations: [VisitUserProfilePage]
})
export class VisitUserProfilePageModule {}
