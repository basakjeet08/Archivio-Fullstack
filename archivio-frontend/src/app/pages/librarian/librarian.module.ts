import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrarianComponent } from './librarian.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for this module
const route: Routes = [{ path: '', component: LibrarianComponent }];

@NgModule({
  declarations: [LibrarianComponent],
  imports: [CommonModule, RouterModule.forChild(route)],
})
export class LibrarianModule {}
