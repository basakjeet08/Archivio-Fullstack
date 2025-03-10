import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrarianComponent } from './librarian.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookRequestComponent } from './components/book-request/book-request.component';
import { MembershipRequestComponent } from './components/membership-request/membership-request.component';
import { librarianGuard } from './guards/librarian.guard';

// These are the routes for this module
const route: Routes = [
  {
    path: '',
    component: LibrarianComponent,
    canActivate: [librarianGuard],
    children: [
      { path: '', redirectTo: 'book-list', pathMatch: 'full' },
      { path: 'book-list', component: BookListComponent },
      { path: 'book-add', component: BookAddComponent },
      { path: 'book-request', component: BookRequestComponent },
      { path: 'membership-request', component: MembershipRequestComponent },
    ],
  },
];

@NgModule({
  declarations: [
    LibrarianComponent,
    BookListComponent,
    BookAddComponent,
    BookRequestComponent,
    MembershipRequestComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(route), SharedModule],
})
export class LibrarianModule {}
