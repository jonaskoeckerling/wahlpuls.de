import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BalkendiagrammComponent } from './components/balkendiagramm/balkendiagramm.component';
import { QuellenComponent } from "./components/quellen/quellen.component";
import { CoalitionListComponent } from "./components/coalition-list/coalition-list.component";
import { CountdownComponent } from "./components/countdown/countdown.component";

@Component({
  selector: 'app-root',
  imports: [BalkendiagrammComponent, QuellenComponent, CoalitionListComponent, CountdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'umfragen-angular';
}
