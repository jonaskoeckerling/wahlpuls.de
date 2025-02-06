import { Component, inject, input } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { DatePipe } from '@angular/common';
import { pollResult } from '../../models/pollresult.model';

@Component({
  selector: 'app-source',
  imports: [DatePipe],
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss'
})
export class SourceComponent {
  pollResult = input.required<pollResult>();
  selected = input.required<Boolean>();

  results = inject(ResultsService);
  handleClick(): void {
    // Set selected source
    this.results.setSelectedPollResult(this.pollResult().id);

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
