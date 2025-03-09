import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for this module
const route: Routes = [{ path: '', component: MemberComponent }];

@NgModule({
  declarations: [MemberComponent],
  imports: [CommonModule, RouterModule.forChild(route)],
})
export class MemberModule {}
