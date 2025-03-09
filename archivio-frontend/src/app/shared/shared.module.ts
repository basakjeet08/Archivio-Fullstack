import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorCardComponent } from './components/error-card/error-card.component';

@NgModule({
  declarations: [HeaderComponent, LoaderComponent, ErrorCardComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, LoaderComponent, ErrorCardComponent],
})
export class SharedModule {}
