import { trigger, query, style, animate, transition} from '@angular/animations';

export const coalitionListAnimation = trigger('coalitionListAnimation', [
    transition('* => *', [
      query(':leave', [
        style({opacity: 1, height: '*', margin: '*'}),
      ], {optional: true}),
      query(':enter', [
        style({opacity: 0, height: '0', margin: '0'}),
      ], {optional: true}),
      query(':leave', [
        animate('200ms ease-in-out', style({opacity: 0, height: '0', margin: '0'}))
      ], {optional: true}),
      query(':enter', [
        animate('200ms ease-in-out', style({opacity: 1, height: '*', margin: '*'}))
      ], {optional: true})
    ], { params: { startHeight: 0} })
]);