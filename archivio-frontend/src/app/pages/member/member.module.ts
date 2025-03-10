import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { RouterModule, Routes } from '@angular/router';
import { memberGuard } from './guards/member.guard';

// These are the routes for this module
const route: Routes = [
  { path: '', component: MemberComponent, canActivate: [memberGuard] },
];

@NgModule({
  declarations: [MemberComponent],
  imports: [CommonModule, RouterModule.forChild(route)],
})
export class MemberModule {}
