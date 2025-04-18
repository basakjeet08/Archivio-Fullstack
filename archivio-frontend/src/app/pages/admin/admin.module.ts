import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibrarianListComponent } from './components/librarian-list/librarian-list.component';
import { LibrarianAddComponent } from './components/librarian-add/librarian-add.component';
import { FormsModule } from '@angular/forms';
import { adminGuard } from './guards/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// These are the routes for this module
const route: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'librarian-list', component: LibrarianListComponent },
      { path: 'librarian-add', component: LibrarianAddComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    LibrarianListComponent,
    LibrarianAddComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedModule,
    FormsModule,
  ],
})
export class AdminModule {}
