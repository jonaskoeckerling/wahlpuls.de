import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-bar',
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent {
  name = input<string>('');
  value = input<number>(0);
  barValue = input<number>(0); // Maximum of all bars should be 100%
  color = input<string>('');

  isDisabled = computed(() => this.name() === "Sonstige" || this.value() < 5);
}
