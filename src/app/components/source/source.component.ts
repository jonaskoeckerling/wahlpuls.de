import { Component, effect, inject, input } from '@angular/core';
import { Quelle } from '../../models/quellen.model';
import { ResultsService } from '../../services/results.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-source',
  imports: [DatePipe],
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss'
})
export class SourceComponent {
  source = input.required<Quelle>();
  selected = input.required<Boolean>();

  results = inject(ResultsService);
  handleClick(): void {
    this.results.setSelectedQuelle(this.source().id);
  }
}
