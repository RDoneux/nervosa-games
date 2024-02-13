import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOutRoute = trigger('routeAnimations', [
  transition(':enter', [style({ opacity: 0 }), animate("1000ms 500ms")]),
  transition(':leave', animate(1000, style({ opacity: 0 }))),
]);

// export const fadeInOutRouteSlow = trigger('routeAnimations', [
//     transition(':enter', [style({ opacity: 0 }), animate(3000)]),
//     transition(':leave', animate(3000, style({ opacity: 0 }))),
//   ]);