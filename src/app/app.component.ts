import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResultsService } from './services/results.service';
import { fadeAnimation } from './animations/fade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation]
})
export class AppComponent {
  results = inject(ResultsService);
}