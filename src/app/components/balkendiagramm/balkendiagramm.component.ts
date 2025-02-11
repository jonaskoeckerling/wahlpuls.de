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
  results = inject(ResultsService);
  selectedQuelle = this.results.selectedPollResult;

  // Get max value for rendering full width chart
  maxValue = computed(() => {
    const allValues = new Array<number>();
    for(const result of this.results.allPollResults()) {
      allValues.push(result.cducsu);
      allValues.push(result.spd);
      allValues.push(result.gruene);
      allValues.push(result.fdp);
      allValues.push(result.afd);
      allValues.push(result.bsw);
      allValues.push(result.linke);
      allValues.push(result.sonstige);
    }
    return Math.max(...allValues);
  });
} 
