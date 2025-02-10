import { Component, inject } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { coalitionListAnimation } from '../../animations/coalitionList';

@Component({
  selector: 'app-coalition-list',
  imports: [],
  templateUrl: './coalition-list.component.html',
  styleUrl: './coalition-list.component.scss',
  animations: [coalitionListAnimation]
})
export class CoalitionListComponent {
  results = inject(ResultsService);

  // Calculate the real css height without padding (no native javascript method for that available)
  getComputedHeight(querySelector: string): number {
    const element = document.querySelector(querySelector);
    if(element !== null) {
      const computedStyle = window.getComputedStyle(element);
      const paddingTop = parseInt(computedStyle.paddingTop);
      const paddingBottom = parseInt(computedStyle.paddingBottom);
      return element.clientHeight - paddingTop - paddingBottom;
    } else {
      return 0;
    }
  }
}
