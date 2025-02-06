import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  state('void', style({
    opacity: 0
  })),
  transition(':enter', [
    animate('300ms ease-in', style({
      opacity: 1
    }))
  ])
]);