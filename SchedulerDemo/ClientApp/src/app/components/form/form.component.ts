import { Component } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserInfo } from 'src/app/models/user-info';
import { UserInfoService } from 'src/app/services/user-info.service';
import { BusinessOwner } from 'src/app/models/business-owner';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  e: Userform = {} as Userform;
  eventList: Userform[] = [];
  businessOwnerList: BusinessOwner[] = [];
  currentOwner: BusinessOwner = {} as BusinessOwner;
  userInfoList: UserInfo[] = [];
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  newUser: UserInfo = {} as UserInfo;
  hasLocation?: boolean = undefined;
  pickedService: boolean = false;
  doesIdExist: boolean = false;
  newInfo: UserInfo = {} as UserInfo;
  alreadyExists: boolean = false;
  currentDate: Date = new Date();
  isInFuture: boolean = true;
  currentDateTime: string;
  cutOffDate: string = this.getCurrentDate();
  selectedTime: string = '';
  timeIntervals: string[] = this.generateTimeIntervals();
  selectedDate: string = ''; // Initialize with an empty string
  listOfServices: Service[] = [];
  currentService: Service = {} as Service;
  duration:number = 0;
  businessClosed: boolean = true;

  constructor(
    private _formService: UserformService,
    private authService: SocialAuthService,
    private userinfoservice: UserInfoService,
    private servService: ServiceService
  ) {
    let now = new Date();
    this.currentDateTime = now.toISOString().slice(0, 16);
  }

  ngOnInit() {
    this.e.businessGoogleId = '1';
    this.newInfo.state = 'MI';
    this.newUser.state = 'MI';
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.GetEvents();
      this.doesThisPersonExist();
    });
    this.populateOwnerList();
  }

  populateOwnerList(): void {
    console.log('before populate');
    this._formService
      .getAllBusiness()
      .subscribe((response: BusinessOwner[]) => {
        console.log('in populate');
        this.businessOwnerList = response;
        console.log(this.businessOwnerList);
      });
  }

  getCurrentDate(): string {
    let now = new Date();
    let year = now.getFullYear();
    let month = `${now.getMonth() + 1}`.padStart(2, '0');
    let day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // generateTimeIntervals(): string[] {
  //   let intervals = [];
  //   let startTime = new Date();
  //   startTime.setHours(0, 0, 0, 0);

  //   for (let i = 0; i < 96; i++) {
  //     // 96 intervals for a 24-hour day
  //     intervals.push(
  //       startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     );
  //     startTime.setMinutes(startTime.getMinutes() + 15);
  //   }

  //   return intervals;
  // }

  generateTimeIntervals(): string[] {
    const intervals: string[] = [];
    const selectedDate = new Date(this.selectedDate);
    
    const dayOfWeek: number = selectedDate.getDay();
  console.log(selectedDate, "selected date")
    // Get the business owner's opening and closing hours for the selected day
    let openingHours: string = (this.currentOwner as any)[`${this.getDayOfWeekString(dayOfWeek)}HoursOpen`];
    let closingHours: string = (this.currentOwner as any)[`${this.getDayOfWeekString(dayOfWeek)}HoursClose`];
    console.log('Opening Hours:', openingHours);
    console.log('Closing Hours:', closingHours);
  
    if (!openingHours || !closingHours) {
      // Business is closed on the selected day
      this.businessClosed = true;
      return intervals;
    }

  console.log(this.selectedDate, "selected date");

let openingTime = new Date(this.selectedDate);
openingTime.setHours(0, 0, 0, 0);
console.log("opening time", openingTime);

// Convert opening hours to 24-hour format
const openingHoursIn24HourFormat = new Date(`${selectedDate.toDateString()} ${openingHours}`);
openingTime.setHours(openingHoursIn24HourFormat.getHours(), openingHoursIn24HourFormat.getMinutes(), 0, 0);
console.log(openingTime, "opening time ")
let closingTime = new Date(this.selectedDate);
console.log("closing time line 163", closingTime);

// Convert closing hours to 24-hour format
const closingHoursIn24HourFormat = new Date(`${selectedDate.toDateString()} ${closingHours}`);
closingTime.setHours(closingHoursIn24HourFormat.getHours(), closingHoursIn24HourFormat.getMinutes(), 0, 0);
console.log("closing time", closingTime);

  
    for (let currentTime = new Date(openingTime); currentTime <= closingTime; currentTime.setMinutes(currentTime.getMinutes() + 15)) {
      intervals.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    
    if(intervals.length == 0){
      this.businessClosed = true
    }
    else{
      this.businessClosed = false;
    }

  console.log(intervals, "intervals")
    return intervals;
  }



  
  getDayOfWeekString(dayIndex: number): string {
    // Convert the day index to a string (e.g., 0 -> 'Sunday', 1 -> 'Monday', ...)
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'  ];
    return daysOfWeek[(dayIndex + 1) % 7];
  }
  




  updateDateTime() {
    // Combine the selected date and time into e.dateTime
    const selectedDate = new Date(this.selectedDate);
    const selectedTimeParts = this.selectedTime.split(':');
    const hours = parseInt(selectedTimeParts[0], 10);
    const minutes = parseInt(selectedTimeParts[1], 10);

    // Add one day to the selected date
    selectedDate.setDate(selectedDate.getDate() + 1);

    // Set the time without changing it
    selectedDate.setHours(hours, minutes, 0, 0);

    this.e.dateTime = selectedDate;
  }

  GetEvents(): void {
    this._formService.getAll().subscribe((response: Userform[]) => {
      this.eventList = response.sort((a, b) => {
        const dateA =
          a.dateTime instanceof Date ? a.dateTime : new Date(a.dateTime);
        const dateB =
          b.dateTime instanceof Date ? b.dateTime : new Date(b.dateTime);
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return 0;
        }
        return dateA.getTime() - dateB.getTime();
      });
    });
  }

  doesThisPersonExist(): void {
    this.userinfoservice
      .getById(this.user.id)
      .subscribe((response: UserInfo) => {
        this.doesIdExist = response != null;
        console.log('Does this person exist?');
        console.log(this.doesIdExist);
        if (this.doesIdExist) {
          this.newUser = response;
        }
      });
  }

  updatedInfo(newInfo: UserInfo): void {
    newInfo.googleId = this.user.id;
    this.userinfoservice.updateUser(newInfo).subscribe((response: UserInfo) => {
      console.log(response);
      this.newUser = response;
    });
  }
  getBusinessOwner(businessId: string): void {
    console.log(businessId);
    this._formService
      .getOneBusiness(businessId)
      .subscribe((response: BusinessOwner) => {
        this.currentOwner = response;
        console.log(this.currentOwner.oneLocation)
        if(this.currentOwner != null){
        this.hasLocation = this.currentOwner.oneLocation;
        }
        this.pickedService = true;
        this.getListofServicesForThisBusiness(businessId);
      });
  }

  getListofServicesForThisBusiness(businessId: string): void{
    this.servService.getServicesByBusinessId(businessId).subscribe((response) => {
      this.listOfServices = response;
      console.log(this.listOfServices, "list has been populated");
    });
  }

  newUserInfo(newUser: UserInfo): void {
    newUser.googleId = this.user.id;
    if (this.currentOwner.oneLocation === true) {
      newUser.address = this.currentOwner.address;
      newUser.city = this.currentOwner.city;
      newUser.state = this.currentOwner.state;
      this.userinfoservice.newUser(newUser).subscribe((response: UserInfo) => {
        this.userInfoList.push(response);
        this.doesIdExist = true;
      });
      this.userInfoList = [];
    } else if (newUser.address != '' && newUser.city != '' && newUser.state != '') {
      this.userinfoservice.newUser(newUser).subscribe((response: UserInfo) => {
        this.userInfoList.push(response);
        this.doesIdExist = true;
      });
      this.userInfoList = [];
    }
  }

  isEventOverlapping(existingEvent: Userform, newEvent: Userform): boolean {
    if (
      (existingEvent.dateTime <= newEvent.dateTime &&
        existingEvent.endDateTime >= newEvent.dateTime) ||
      (existingEvent.dateTime <= newEvent.endDateTime &&
        existingEvent.endDateTime >= newEvent.endDateTime)
    ) {
      this.alreadyExists = true;
      console.log('Is event working is working');
      return true;
    } else {
      return false;
    }
  }

  futureEventOnly(newEvent: Date): boolean {
    if (newEvent < this.currentDate) {
      this.isInFuture = false;
      return false;
    } else {
      this.isInFuture = true;
      return true;
    }
  }




  addingEvent(newEvent: Userform): void {
    // Update the date and time properties of the new event
    this.updateDateTime();
    console.log(newEvent);
    // Convert the dateTime string to a Date object
    let newNewDate: Date = new Date(newEvent.dateTime);
    // Find the service in the list of services based on the description
    for (const service of this.listOfServices) {
      if (service.serviceName === newEvent.description) {
        this.currentService = service;
        break;
      }
    }
    // Set the duration of the event based on the selected service
    this.duration = parseInt(this.currentService.minutesLong);
  
    // Calculate the timestamp for the endDateTime
    let timestamp = newNewDate.getTime() + this.duration * 60000;
    newEvent.endDateTime = new Date(timestamp);
  
    // Log relevant information
    console.log(newNewDate);
    console.log(timestamp);
    console.log(newEvent.endDateTime);
    console.log(this.eventList);
  
    this.alreadyExists = false;
  
    // Check if the event is a future event only
    if (this.futureEventOnly(newNewDate)) {
      // Check for overlapping events
      for (let existingEvent of this.eventList) {
        if (!this.isEventOverlapping(existingEvent, newEvent)) {
          console.log('entering if not overlapping');
        } else {
          this.alreadyExists = true;
          console.log('entering else is overlapping event');
        }
      }
      // Check if the user's name is not null and the event does not overlap with existing events
      if (this.user.name != null && this.alreadyExists === false) {
        console.log('second if is working name is not null and event is not overlapping');
  
        // Fetch user information by ID
        this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo) => {
          if (this.doesIdExist) {
            this.newUser = response;
            newEvent.googleId = this.newUser.googleId;
            newEvent.address = this.newUser.address;
            newEvent.city = this.newUser.city;
            newEvent.state = this.newUser.state;
            newEvent.firstName = this.user.firstName;
            newEvent.lastName = this.user.lastName;
          }
          // Add the event to the database
          this._formService.addEvent(newEvent).subscribe((response: Userform) => {
            this.eventList.push(response);
          });
        });
      } else if (this.alreadyExists === false) {
        // Add the event to the database with business owner information
        newEvent.address = this.currentOwner.address;
        newEvent.city = this.currentOwner.city;
        newEvent.state = this.currentOwner.state;
  
        this._formService.addEvent(newEvent).subscribe((response: Userform) => {
          this.eventList.push(response);
        });
      } else if (this.alreadyExists === true) {
        console.log('bool is working');
      }
    }
    // Reset flags and objects
    this.pickedService = false;
    this.e = {} as Userform;
    this.newUser = {} as UserInfo;
    // Retrieve updated events
    this.GetEvents();
  }
  
}
