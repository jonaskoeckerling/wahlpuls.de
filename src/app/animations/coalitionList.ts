import { trigger, query, style, animate, transition, group} from '@angular/animations';

export const coalitionListAnimation = trigger('coalitionListAnimation', [
    transition('* => *', [
      query(':leave', [
        style({display: '*', opacity: 1, height: '*', marginTop: '*'}),
      ], {optional: true}),
      query(':enter', [
        style({display: 'none', opacity: 0, height: '0', marginTop: '0'}),
      ], {optional: true}),
      query(':leave', [
        animate('200ms', style({display: 'none', opacity: 0, height: '0', marginTop: '0'}))
      ], {optional: true}),
      query(':enter', [
        animate('200ms', style({display: '*', opacity: 1, height: '*', marginTop: '*'}))
      ], {optional: true}),
    ], { params: { startHeight: 0} })
]);