import { Component } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {

  //   private events: Event[] = [];
  
  //   constructor() {}
  
  //   addEvent(title: string, date: Date, description: string) {
  //     const event = new Event(title, date, description);
  //     this.events.push(event);
  //   }
  
  //   viewEvents() {
  //     console.log('Events on the calendar:');
  //     for (const event of this.events) {
  //       console.log(`Title: ${event.title}`);
  //       console.log(`Date: ${event.date.toDateString()}`);
  //       console.log(`Description: ${event.description}`);
  //       console.log('-----------------------');
  //     }
  //   }
  // }
  
  // class Event {
  //   constructor(public title: string, public date: Date, public description: string) {}
  // }
  
  // // Usage
  // const myCalendar = new CalenderComponent();
  
  // myCalendar.addEvent('Meeting with Client', new Date('2023-10-30'), 'Discuss project requirements');
  // myCalendar.addEvent('Lunch with Team', new Date('2023-11-5'), 'Team bonding and updates');
  // myCalendar.addEvent('Conference Call', new Date('2023-11-10'), 'Discuss quarterly results');
  
  // myCalendar.viewEvents();
  
}
