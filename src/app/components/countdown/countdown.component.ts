import { Component } from '@angular/core';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  getDays(): number {
    let today = new Date();
    let voteday = new Date("2025-02-23");
    let difference_in_time = voteday.getTime() - today.getTime();
    let difference_in_days = Math.round(difference_in_time / (1000 * 3600 * 24));
    return difference_in_days;
  }
}
