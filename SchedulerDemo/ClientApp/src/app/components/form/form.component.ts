import { Component } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserInfo } from 'src/app/models/user-info';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  e: Userform = {} as Userform;
  eventList: Userform[] = [];
  userInfoList: UserInfo[] = [];
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  newUser: UserInfo = {} as UserInfo;
  doesIdExist: boolean = false;
  newInfo: UserInfo ={} as UserInfo ;
  alreadyExists: boolean =false;

  constructor(
    private _formService: UserformService,
    private authService: SocialAuthService,
    private userinfoservice: UserInfoService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.newInfo.state = "MI";
      this.newUser.state = "MI";
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = user != null;
        this.GetEvents();
          this.doesThisPersonExist();
        })});
      
    
  };
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

  newUserInfo(newUser: UserInfo): void {
    newUser.googleId = this.user.id;
    if(newUser.address != '' && newUser.city != '' && newUser.state != ''){
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


  addingEvent(newEvent: Userform): void {
       
        console.log(newEvent)
    let newNewDate: Date = new Date(newEvent.dateTime);
    let timestamp = newNewDate.getTime() + 30 * 60000;
    newEvent.endDateTime = new Date(timestamp);
  console.log(newNewDate)
  console.log(timestamp)
  console.log(newEvent.endDateTime)
  console.log(this.eventList)
    this.alreadyExists = false;

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
    
    this.e = {} as Userform;
    this.newUser = {} as UserInfo;
    this.GetEvents();
  }

}
