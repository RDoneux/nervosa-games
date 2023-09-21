import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fade', [
  transition(':enter', [style({ opacity: 0 }), animate(250)]),
  transition(':leave', animate(250, style({ opacity: 0 }))),
]);
