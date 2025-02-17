import { Component, computed, inject } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { BarComponent } from '../bar/bar.component';

@Component({
  selector: 'app-balkendiagramm',
  imports: [BarComponent],
  templateUrl: './balkendiagramm.component.html',
  styleUrl: './balkendiagramm.component.scss'
})
export class BalkendiagrammComponent {
  resultsService = inject(ResultsService);

  // Get max value for rendering full width chart
  maxValue = computed(() => {
    const allValues = new Array<number>();
    for(const source of this.resultsService.allSources()) {
      allValues.push(source.pollResults[0].cducsu);
      allValues.push(source.pollResults[0].spd);
      allValues.push(source.pollResults[0].gruene);
      allValues.push(source.pollResults[0].fdp);
      allValues.push(source.pollResults[0].afd);
      allValues.push(source.pollResults[0].bsw);
      allValues.push(source.pollResults[0].linke);
      allValues.push(source.pollResults[0].sonstige);
    }
    return Math.max(...allValues);
  });
} 
