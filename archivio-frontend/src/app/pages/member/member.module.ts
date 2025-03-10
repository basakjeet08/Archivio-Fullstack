import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { RouterModule, Routes } from '@angular/router';
import { memberGuard } from './guards/member.guard';
import { BookListComponent } from './components/book-list/book-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

// These are the routes for this module
const route: Routes = [
  {
    path: '',
    component: MemberComponent,
    canActivate: [memberGuard],
    children: [
      { path: '', redirectTo: 'book-list', pathMatch: 'full' },
      { path: 'book-list', component: BookListComponent },
    ],
  },
];

@NgModule({
  declarations: [MemberComponent, BookListComponent],
  imports: [CommonModule, RouterModule.forChild(route), SharedModule],
})
export class MemberModule {}
