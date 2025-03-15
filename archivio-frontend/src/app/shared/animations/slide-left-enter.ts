import { animate, style, transition, trigger } from '@angular/animations';

// This function provides a nice slide in to the left effect with the fade effect with it
export const slideLeftEnterAnimation = trigger('slideLeftEnterAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate(
      '500ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);
