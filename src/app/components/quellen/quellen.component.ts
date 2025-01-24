import { Component, inject } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { SourceComponent } from '../source/source.component';

@Component({
  selector: 'app-quellen',
  imports: [SourceComponent],
  templateUrl: './quellen.component.html',
  styleUrl: './quellen.component.scss'
})
export class QuellenComponent {
  results = inject(ResultsService);
}
