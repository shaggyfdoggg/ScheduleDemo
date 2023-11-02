import { Component, Input } from '@angular/core';
import { Userform } from 'src/app/models/userform';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {
  @Input() day: { date: Date; events: { event: Userform, time: string }[] };

  constructor() {
    this.day = { date: new Date(), events: [] }; // Initialize with default values if needed
  }
}