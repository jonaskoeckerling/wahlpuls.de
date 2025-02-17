import { Component, inject } from '@angular/core';
import { BalkendiagrammComponent } from './components/balkendiagramm/balkendiagramm.component';
import { QuellenComponent } from "./components/quellen/quellen.component";
import { CoalitionListComponent } from "./components/coalition-list/coalition-list.component";
import { CountdownComponent } from "./components/countdown/countdown.component";
import { ResultsService } from './services/results.service';
import { fadeAnimation } from './animations/fade';
import { LinechartComponent } from "./components/linechart/linechart.component";

@Component({
  selector: 'app-root',
  imports: [BalkendiagrammComponent, QuellenComponent, CoalitionListComponent, CountdownComponent, LinechartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'umfragen-angular';

  results = inject(ResultsService);
}
