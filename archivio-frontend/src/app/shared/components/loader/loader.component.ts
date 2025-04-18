import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  // This variable stores if the loader should be visible or not
  @Input('isLoading') isLoading: boolean = false;
}
