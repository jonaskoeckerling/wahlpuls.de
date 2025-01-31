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
    this.results.setSelectedPollResult(this.pollResult().id);
  }
}
