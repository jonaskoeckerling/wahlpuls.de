import { Component } from '@angular/core';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  getCountdownText(): String {
    let today = new Date();
    let voteday = new Date("2029-02-23");
    let difference_in_time = voteday.getTime() - today.getTime();
    let difference_in_days = Math.round(difference_in_time / (1000 * 3600 * 24));
    if (difference_in_days > 30) {
      if (difference_in_days > 365) {
        return Math.round(difference_in_days / 365) + " Jahre";
      }
      return Math.round(difference_in_days / 30) + " Monate";
    }
    return Math.round(difference_in_days) + " Tage";
  }
}
