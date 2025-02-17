import { Component, inject, input } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { DatePipe } from '@angular/common';
import { Source } from '../../models/source.model';

@Component({
  selector: 'app-source',
  imports: [DatePipe],
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss'
})
export class SourceComponent {
  source = input.required<Source>();
  selected = input.required<Boolean>();
  resultsService = inject(ResultsService);

  handleClick(): void {
    // Set selected source
    this.resultsService.setSelectedSource(this.source());

    // Scroll bar chart into view for mobile
    const barchart = document.getElementById("barchart");
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw < 930 && barchart !== null)
      barchart.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
        });
  }
}
