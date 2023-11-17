import { Component } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserInfo } from 'src/app/models/user-info';
import { UserInfoService } from 'src/app/services/user-info.service';
import { BusinessOwner } from 'src/app/models/business-owner';

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
  pickedService:boolean = false;
  doesIdExist: boolean = false;
  newInfo: UserInfo ={} as UserInfo ;
  alreadyExists: boolean =false;
  currentDate: Date = new Date();
  isInFuture: boolean = true;
  currentDateTime: string;
  cutOffDate: string =this.getCurrentDate();
  selectedTime: string = '';
  timeIntervals: string[] = this.generateTimeIntervals();
  selectedDate: string = ''; // Initialize with an empty string


  constructor(
    private _formService: UserformService,
    private authService: SocialAuthService,
    private userinfoservice: UserInfoService
  ) {
    let now = new Date();
    this.currentDateTime = now.toISOString().slice(0, 16);
  }

  ngOnInit() {
    this.e.businessGoogleId = '1';
      this.newInfo.state = "MI";
      this.newUser.state = "MI";
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = user != null;
        this.GetEvents();
          this.doesThisPersonExist();
        });
        this.populateOwnerList();
  };

  populateOwnerList():void {
    console.log("before populate")
    this._formService.getAllBusiness().subscribe((response: BusinessOwner[]) => {
      console.log("in populate")
      this.businessOwnerList = response;
      console.log(this.businessOwnerList)
    });
  }

  getCurrentDate(): string {
    let now = new Date();
    let year = now.getFullYear();
    let month = `${now.getMonth() + 1}`.padStart(2, '0');
    let day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  generateTimeIntervals(): string[] {
    let intervals = [];
    let startTime = new Date();
    startTime.setHours(0, 0, 0, 0);

    for (let i = 0; i < 96; i++) { // 96 intervals for a 24-hour day
      intervals.push(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      startTime.setMinutes(startTime.getMinutes() + 15);
    }

    return intervals;
  }

  // updateDateTime() {
  //   // Combine the selected date and time into e.dateTime
  //   const selectedDate = new Date(this.selectedDate);
  //   const selectedTimeParts = this.selectedTime.split(':');
  //   selectedDate.setHours(parseInt(selectedTimeParts[0], 10), parseInt(selectedTimeParts[1], 10));
    
  //   this.e.dateTime = selectedDate; 
  // }

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
        const dateA = a.dateTime instanceof Date ? a.dateTime : new Date(a.dateTime);
        const dateB = b.dateTime instanceof Date ? b.dateTime : new Date(b.dateTime);
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return 0;
        }
        return dateA.getTime() - dateB.getTime();
      });
    });
  }


  doesThisPersonExist(): void {
    this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo) => {
      
      this.doesIdExist = response != null;
      console.log("Does this person exist?")
      console.log(this.doesIdExist)
      if (this.doesIdExist) {
        this.newUser = response;        
      }     
    });
  }

  updatedInfo(newInfo: UserInfo): void{
    newInfo.googleId = this.user.id;
    this.userinfoservice.updateUser(newInfo).subscribe((response: UserInfo)=>{
      console.log(response);
      this.newUser = response;
    });
  }
  getBusinessOwner(businessId: string):void{
    this._formService.getOneBusiness(businessId).subscribe((response: BusinessOwner) =>{
      this.currentOwner = response;
      this.hasLocation = this.currentOwner.oneLocation;
      this.pickedService = true;
    });
  }

  newUserInfo(newUser: UserInfo): void {
    newUser.googleId = this.user.id;
    if(this.currentOwner.oneLocation == true){
      newUser.address = this.currentOwner.Address;
      newUser.city = this.currentOwner.City;
      newUser.state = this.currentOwner.State;
      this.userinfoservice.newUser(newUser).subscribe((response: UserInfo) => {
        this.userInfoList.push(response);
        this.doesIdExist = true;
      });
      this.userInfoList = [];
    }
    else if(newUser.address != '' && newUser.city != '' && newUser.state != ''){
    this.userinfoservice.newUser(newUser).subscribe((response: UserInfo) => {
      this.userInfoList.push(response);
      this.doesIdExist = true;
    });
    this.userInfoList = [];
     
  }
  }

  
  isEventOverlapping(existingEvent: Userform, newEvent: Userform):boolean {
    if((existingEvent.dateTime <= newEvent.dateTime && existingEvent.endDateTime >= newEvent.dateTime) || 
    (existingEvent.dateTime <= newEvent.endDateTime && existingEvent.endDateTime >= newEvent.endDateTime ))  
    {    
      this.alreadyExists = true;
        console.log('Is event working is working')
        return true;
      }
      
      else{
        return false;
      }
    };
    
    futureEventOnly(newEvent: Date): boolean{
      if(newEvent < this.currentDate)
      {
        this.isInFuture = false;
        return false;
      }
      else{
        this.isInFuture = true;
        return true;
      }
    }
    
    
    addingEvent(newEvent: Userform): void {
    this.updateDateTime();
        console.log(newEvent)
        let newNewDate: Date = new Date(newEvent.dateTime);
    let timestamp = newNewDate.getTime() + 30 * 60000;
    newEvent.endDateTime = new Date(timestamp);
  console.log(newNewDate)
  console.log(timestamp)
  console.log(newEvent.endDateTime)
  console.log(this.eventList)
    this.alreadyExists = false;
    if(this.futureEventOnly(newNewDate) == true){

    for (let existingEvent of this.eventList) {
      if (!this.isEventOverlapping(existingEvent, newEvent)) {
      console.log("entering if")     
    }
      else{
        this.alreadyExists = true;
        console.log("entering else")
      }
    }

      if ((this.user) && (this.alreadyExists === false)) {
        console.log('second if is working')
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
        this._formService.addEvent(newEvent).subscribe((response: Userform) => {
          this.eventList.push(response);
        });
      });
    }
     else if(this.alreadyExists === false) {
      this._formService.addEvent(newEvent).subscribe((response: Userform) => {
        this.eventList.push(response);
      });
    }
    else if(this.alreadyExists === true){
      console.log('bool is working')
    }
  }


    this.e = {} as Userform;
    this.newUser = {} as UserInfo;
    this.GetEvents();
  }

}
