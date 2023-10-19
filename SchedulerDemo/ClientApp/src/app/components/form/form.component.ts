import { Component, EventEmitter, Output } from '@angular/core';
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

  //  @Output() eventCreated = new EventEmitter<Userform>();

  constructor(
    private _formService: UserformService,
    private authService: SocialAuthService,
    private userinfoservice: UserInfoService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.doesThisPersonExist();
    });
  }

  addingEvent(newEvent: Userform): void {   
    this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo)=> {
      console.log(response);
      this.newUser = response;
      newEvent.googleId = this.newUser.googleId;
      newEvent.address = this.newUser.address;
      newEvent.city = this.newUser.city;
      newEvent.state = this.newUser.state;
      newEvent.firstName = this.user.firstName;
      newEvent.lastName = this.user.lastName;
      this._formService.addEvent(newEvent).subscribe((response: Userform) => {
        console.log(response);
        this.eventList.push(response);
      });
    });
    this.e = {} as Userform;
    this.newUser = {} as UserInfo;
  }



  newUserInfo(newUser: UserInfo): void {
    newUser.googleId = this.user.id
    this.userinfoservice
      .newUser(newUser)
      .subscribe((response: UserInfo) => {
        console.log(response);
        this.userInfoList.push(response);
      });
      this.userInfoList = [];
  }

doesThisPersonExist():void{
  this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo)=> {
    console.log(response);
  if(response != null){
this.doesIdExist = true;
}
else {
  this.doesIdExist = false;
}
  });
    

    
}

}



// CreateEvent(){
// this.eventCreated.emit(this.e);
// }
