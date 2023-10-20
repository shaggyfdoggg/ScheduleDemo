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

  constructor(
    private _formService: UserformService,
    private authService: SocialAuthService,
    private userinfoservice: UserInfoService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        this.doesThisPersonExist();
      }
    });
  }

  doesThisPersonExist(): void {
    this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo) => {
      this.doesIdExist = response != null;
      if (this.doesIdExist) {
        this.newUser = response;
      }
    });
  }

  addingEvent(newEvent: Userform): void {
    if (this.user) {
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
    } else {
      this._formService.addEvent(newEvent).subscribe((response: Userform) => {
        this.eventList.push(response);
      });
    }

    this.e = {} as Userform;
    this.newUser = {} as UserInfo;
  }

  newUserInfo(newUser: UserInfo): void {
    newUser.googleId = this.user.id;
    this.userinfoservice.newUser(newUser).subscribe((response: UserInfo) => {
      this.userInfoList.push(response);
    });
    this.userInfoList = [];
    this.newUser = {} as UserInfo;
    this.doesThisPersonExist();
  }
}