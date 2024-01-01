import {
  animateChild,
  query,
  stagger,
  transition,
  trigger,
} from '@angular/animations';

export const animationStagger = trigger('stagger', [
  transition(':enter', [query(':enter', stagger('.3s', [animateChild()]), {optional: true})]),
]);
