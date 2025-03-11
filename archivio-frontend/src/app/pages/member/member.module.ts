import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { RouterModule, Routes } from '@angular/router';
import { memberGuard } from './guards/member.guard';
import { BookListComponent } from './components/book-list/book-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestedBooksComponent } from './components/requested-books/requested-books.component';
import { ToBeReturnedComponent } from './components/to-be-returned/to-be-returned.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// These are the routes for this module
const route: Routes = [
  {
    path: '',
    component: MemberComponent,
    canActivate: [memberGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'book-list', component: BookListComponent },
      { path: 'requested-books', component: RequestedBooksComponent },
      { path: 'to-be-returned', component: ToBeReturnedComponent },
    ],
  },
];

@NgModule({
  declarations: [
    MemberComponent,
    BookListComponent,
    RequestedBooksComponent,
    ToBeReturnedComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(route), SharedModule],
})
export class MemberModule {}
