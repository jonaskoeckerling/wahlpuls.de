import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-linechart',
  imports: [],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss'
})
export class LinechartComponent implements OnInit {
  resultsService = inject(ResultsService);

  chart?: Chart;

  chartData = computed(() => {
    return {
      labels: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.date),
      datasets: [
        {
          label: 'CDU/CSU',
          data: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.cducsu),
          borderColor: this.resultsService.getPartyColor("CDU/CSU"),
          backgroundColor: this.resultsService.getPartyColor("CDU/CSU"),
        },
        {
          label: 'AfD',
          data: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.afd),
          borderColor: this.resultsService.getPartyColor("AfD"),
          backgroundColor: this.resultsService.getPartyColor("AfD"),
        },
        {
          label: 'SPD',
          data: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.spd),
          borderColor: this.resultsService.getPartyColor("SPD"),
          backgroundColor: this.resultsService.getPartyColor("SPD"),
        },
        {
          label: 'Grüne',
          data: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.gruene),
          borderColor: this.resultsService.getPartyColor("Grüne"),
          backgroundColor: this.resultsService.getPartyColor("Grüne"),
        },
        {
          label: 'Linke',
          data: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.linke),
          borderColor: this.resultsService.getPartyColor("Linke"),
          backgroundColor: this.resultsService.getPartyColor("Linke"),
        },
        {
          label: 'BSW',
          data: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.bsw),
          borderColor: this.resultsService.getPartyColor("BSW"),
          backgroundColor: this.resultsService.getPartyColor("BSW"),
        },
        {
          label: 'FDP',
          data: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.fdp),
          borderColor: this.resultsService.getPartyColor("FDP"),
          backgroundColor: this.resultsService.getPartyColor("FDP"),
        },
        {
          label: 'Sonstige',
          data: this.resultsService.selectedSource().pollResults.map(pollResult => pollResult.sonstige),
          borderColor: this.resultsService.getPartyColor("Sonstige"),
          backgroundColor: this.resultsService.getPartyColor("Sonstige"),
        },
      ],
    }
  });

  ngOnInit() {

    // Set chart.js style defaults
    Chart.defaults.font.size = 12;
    Chart.defaults.font.family = "Outfit";
    Chart.defaults.color = "var(--font-color)";

    // Create chart.js instance
    this.chart = new Chart("lineChartCanvas", {
      type: 'line',
      data: this.chartData(),
      options: {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0.2
          }
        },
        plugins: {
          legend:
          {
            display: false,
          },
          tooltip: {
            backgroundColor: "var(--black)",
            padding: 12,
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.parsed.y + '%';
              }
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'yyyy-MM-dd',
              unit: 'month',
              displayFormats: {
                month: 'MMM yyyy'
              },
              tooltipFormat: "dd.MM.yyyy",
            },
            adapters: {
              date: {
                locale: de
              }
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
            },
          },
          y: {
            ticks: {
              stepSize: 10,
              callback: function (value) {
                return value + ' %';
              }
            },
          }
        },
      }
    });
  }

  constructor() {
    // Update chart, when signal gets emitted
    effect(() => {
      if (this.chart) {
        this.chart.data = this.chartData();
        this.chart.update();
      }
    });
  }
}
