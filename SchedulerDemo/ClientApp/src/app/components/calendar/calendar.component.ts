// import { Component, OnInit } from '@angular/core';
// import { UserformService } from 'src/app/services/userform.service';
// import { Userform } from 'src/app/models/userform';

// @Component({
//   selector: 'app-calendar',
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.css']
// })
// export class CalendarComponent implements OnInit {
//   calendarData: { date: Date; events: { event: Userform, time: string }[] }[][] = [];
//   events: Userform[] = [];
//   currentMonthName: string = ''; 
//   currentYear: number = 0;
//   daysInMonth: string[] = [];
//   nextMonthName: string = ''; 
//   nextMonthYear: number = 0;

//   constructor(private eventService: UserformService) {}

//   ngOnInit() {
//     this.eventService.getAll().subscribe(response => {
//       this.events = response;

//       const today = new Date();
//       this.currentMonthName = this.getMonthName(today.getMonth()); 
//       this.currentYear = today.getFullYear();
//       this.nextMonthName = this.getMonthName(today.getMonth()+1);
//       console.log(this.nextMonthName)

//       this.initializeCalendar();
//     });
//   }

//   // initializeCalendar() {
//   //   const today = new Date();
//   //   this.currentMonthName = this.getMonthName(today.getMonth());
//   //   this.currentYear = today.getFullYear();
//   //   this.daysInMonth = this.getDaysOfWeek();
//   //   this.calendarData = this.buildCalendarData(today);
//   // }
//   initializeCalendar() {
//     const today = new Date(this.currentYear, this.getMonthNumber(this.currentMonthName), 1); // Start from the 1st day of the current month
//     this.daysInMonth = this.getDaysOfWeek();
//     this.calendarData = this.buildCalendarData(today);
//   }

//   buildCalendarData(date: Date): { date: Date; events: { event: Userform, time: string }[] }[][] {
//     const calendarData: { date: Date; events: { event: Userform, time: string }[] }[][] = [];

//     for (let week = 0; week < 6; week++) {
//       calendarData[week] = [];
//       for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
//         // Initialize an empty cell in the calendarData
//         calendarData[week][dayOfWeek] = {
//           date: new Date(date), // Set the date to the current date
//           events: [] // Initialize an empty array for events
//         };
//         date.setDate(date.getDate() + 1); // Move to the next day
//       }
//     }

//     for (const event of this.events) {
//       const eventDate = new Date(event.dateTime); // Create a Date object from the event's dateTime
//       const weekIndex = Math.floor((eventDate.getDate() - 1) / 7); // Determine the week index based on the event's date
//       const dayOfWeek = eventDate.getDay(); // Determine the day of the week based on the event's date
//       calendarData[weekIndex][dayOfWeek].events.push({
//         event: event, // Add the event to the specific week and day in the calendarData
//         time: eventDate.toLocaleTimeString() // Format and store the event's time
//       });
//     }

//     return calendarData;
//   }




//   getMonthName(monthIndex: number): string {
//     const monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
//     return monthNames[monthIndex];
//   }

//   getMonthNumber(monthName: string): number {
//     const monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
//     return monthNames.indexOf(monthName);
//   }

//   getDaysOfWeek(): string[] {
//     return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   }
// }




//---------------------------------------------------------------------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { UserformService } from 'src/app/services/userform.service';
// import { Userform } from 'src/app/models/userform';

// @Component({
//   selector: 'app-calendar',
//   templateUrl: './calendar.component.html',
//     styleUrls: ['./calendar.component.css']
// })
// export class CalendarComponent implements OnInit {
//   calendarData: { date: Date; events: { event: Userform, time: string }[] }[][] = [];
//   events: Userform[] = [];
//   currentMonthName: string = '';
//   currentYear: number = 0;
//   daysInMonth: string[] = [];
//   nextMonthName: string = '';
//   nextMonthYear: number = 0;
//   selectedMonth: string = '';
//   constructor(private eventService: UserformService) {}

//   ngOnInit() {
//     this.eventService.getAll().subscribe(response => {
//       this.events = response;
//       const today = new Date();
//       this.currentMonthName = this.getMonthName(today.getMonth());
//       this.currentYear = today.getFullYear();
//       const nextMonth = new Date(today);
//       nextMonth.setMonth(today.getMonth() + 1);
//       this.nextMonthName = this.getMonthName(nextMonth.getMonth());
//       this.nextMonthYear = nextMonth.getFullYear();
//       this.initializeCalendar();
//     });
//   }

import { Component, OnInit } from '@angular/core';
import { UserformService } from 'src/app/services/userform.service';
import { Userform } from 'src/app/models/userform';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarData: { date: Date; events: { event: Userform, time: string }[] }[][] = [];
  events: Userform[] = [];
  // currentMonthName: string = '';
  currentYear: number = 0;
  daysInMonth: string[] = [];
  nextMonthName: string = '';
  nextMonthYear: number = 0;
  selectedMonth: string = '';
  
  constructor(private eventService: UserformService) {}

  ngOnInit() {
    this.eventService.getAll().subscribe(response => {
      this.events = response;
      const today = new Date();
      this.selectedMonth = this.getMonthName(today.getMonth());
      this.currentYear = today.getFullYear();
      
      this.initializeCalendar();
    });
  }


  buildCalendarData(date: Date): { date: Date; events: { event: Userform, time: string }[] }[][] {
    const calendarData: { date: Date; events: { event: Userform, time: string }[] }[][] = [];
  
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentDay = new Date(firstDay);
  
    // Adjust currentDay to the first day of the week that includes the first day of the month
    currentDay.setDate(1 - (firstDay.getDay() + 6) % 7);
  
    for (let week = 0; week < 5; week++) {
      calendarData[week] = [];
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        calendarData[week][dayOfWeek] = {
          date: new Date(currentDay),
          events: []
        };
        currentDay.setDate(currentDay.getDate() + 1);
      }
    }
  
    for (const event of this.events) {
      const eventDate = new Date(event.dateTime);
      if (eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear()) {
        const dayOfMonth = eventDate.getDate();
        const weekIndex = Math.floor((dayOfMonth - 1) / 7);
        const dayOfWeek = eventDate.getDay();
        calendarData[weekIndex][dayOfWeek].events.push({
          event: event,
          time: eventDate.toLocaleTimeString()
        });
      }
    }
  
    return calendarData;
  }
  

  initializeCalendar() {
    let today = new Date(this.currentYear, this.getMonthNumber(this.selectedMonth), 1);
    this.daysInMonth = this.getDaysOfWeek();
    this.calendarData = this.buildCalendarData(today);
  }



  // buildCalendarData(date: Date): { date: Date; events: { event: Userform, time: string }[] }[][] {
  //   const calendarData: { date: Date; events: { event: Userform, time: string }[] }[][] = [];
  
  //   const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //   let currentDay = new Date(firstDay);
  
  //   for (let week = 0; week < 5; week++) {
  //     calendarData[week] = [];
  //     for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
  //       calendarData[week][dayOfWeek] = {
  //         date: new Date(currentDay),
  //         events: []
  //       };
  //       currentDay.setDate(currentDay.getDate() + 1);
  //     }
  //   }
  
  //   for (const event of this.events) {
  //     const eventDate = new Date(event.dateTime);
  //     if (eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear()) {
  //       const dayOfMonth = eventDate.getDate();
  //       const weekIndex = Math.floor((dayOfMonth - 1) / 7);
  //       const dayOfWeek = eventDate.getDay();
  //       calendarData[weekIndex][dayOfWeek].events.push({
  //         event: event,
  //         time: eventDate.toLocaleTimeString()
  //       });
  //     }
  //   }
  
  //   return calendarData;
  // }



  getMonthName(monthIndex: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  }

  getMonthNumber(monthName: string): number {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames.indexOf(monthName);
  }

  getDaysOfWeek(): string[] {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  changeCalendar() {
    // Update the calendar based on the selected month
    this.initializeCalendar();
  }
}