import { animate, style, transition, trigger } from '@angular/animations';

// This function provides a nice slide up effect with the fade effect with it
export const slideUpEnterAnimation = trigger('slideUpEnterAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(50px)' }),
    animate(
      '500ms ease-in-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);
