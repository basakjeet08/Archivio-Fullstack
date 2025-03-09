import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibrarianListComponent } from './components/librarian-list/librarian-list.component';
import { LibrarianAddComponent } from './components/librarian-add/librarian-add.component';

// These are the routes for this module
const route: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'librarian-list', pathMatch: 'full' },
      { path: 'librarian-list', component: LibrarianListComponent },
      { path: 'librarian-add', component: LibrarianAddComponent },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, LibrarianListComponent, LibrarianAddComponent],
  imports: [CommonModule, RouterModule.forChild(route), SharedModule],
})
export class AdminModule {}
