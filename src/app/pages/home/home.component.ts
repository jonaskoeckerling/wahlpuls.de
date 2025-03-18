import { Component, inject } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { BalkendiagrammComponent } from "../../components/balkendiagramm/balkendiagramm.component";
import { CoalitionListComponent } from "../../components/coalition-list/coalition-list.component";
import { LinechartComponent } from "../../components/linechart/linechart.component";
import { QuellenComponent } from "../../components/quellen/quellen.component";
import { CountdownComponent } from "../../components/countdown/countdown.component";

@Component({
    selector: 'app-home',
    imports: [BalkendiagrammComponent, CoalitionListComponent, LinechartComponent, QuellenComponent, CountdownComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    results = inject(ResultsService);
}
