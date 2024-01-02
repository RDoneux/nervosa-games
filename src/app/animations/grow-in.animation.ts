import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const growIn = trigger('grow', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ height: 0 }),
        stagger(50, [animate(250), style({ height: '60px' })]),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ height: '60px' }),
        stagger(50, [animate(250), style({ height: 0 })]),
      ],
      { optional: true }
    ),
  ]),
]);
