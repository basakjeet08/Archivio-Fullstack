import { animate, style, transition, trigger } from '@angular/animations';

// This function provides a nice slide in to the right effect with the fade effect with it
export const slideRightEnterAnimation = trigger('slideRightEnterAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-150px)' }),
    animate(
      '700ms ease-in-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);
