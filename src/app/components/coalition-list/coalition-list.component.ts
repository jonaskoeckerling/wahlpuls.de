import { Component, inject } from '@angular/core';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-coalition-list',
  imports: [],
  templateUrl: './coalition-list.component.html',
  styleUrl: './coalition-list.component.scss'
})
export class CoalitionListComponent {
  results = inject(ResultsService);
}
