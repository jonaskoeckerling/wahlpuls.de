import { Component, effect, inject, signal } from '@angular/core';
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
  selectedQuelle = this.results.selectedQuelle;

  // Get max value for rendering full width chart
  maxValue = signal<number>(0);

  constructor() {
    effect(() => {
      this.maxValue.set(Math.max(...[
        this.selectedQuelle().cducsu,
        this.selectedQuelle().spd,
        this.selectedQuelle().afd,
        this.selectedQuelle().bsw,
        this.selectedQuelle().linke,
        this.selectedQuelle().sonstige,
        this.selectedQuelle().fdp,
        this.selectedQuelle().gruene,
      ]));
    });
  }
} 
