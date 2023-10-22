import { Component } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.css']
})
export class FormResultComponent {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  newUser: UserInfo = {} as UserInfo;
  list: Userform[] = [];
  doesIdExist: boolean = false;

  constructor(
    private _formService: UserformService,
    private authService: SocialAuthService,
    private userinfoservice: UserInfoService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.setGoogleId();
      this.admin();
      
      // Introduce a 2-second delay before calling GetEvents
      setTimeout(() => {
        this.GetEvents();
      }, 500); // 2000 milliseconds = 2 seconds
    });
  }

  admin(): void {
    if (this.loggedIn) {
      if (this.user.id === "111099414700493252194" ||
          this.user.id === "105703390204457945598" ||
          this.user.id === "113474372826010217045" ||
          this.user.id === "106261488563615030647") {
        this.isAdmin = true;
      }
    }
  }

  setGoogleId(): void {
    this.doesThisPersonExist();
  }

  thisEventIsDeadToMe(id: number): void {
    this._formService.deleteEvent(id).subscribe((response: Userform) => {
      this.GetEvents();
    });
  }

  GetEvents(): void {
    this._formService.getAll().subscribe((response: Userform[]) => {
      this.list = response.sort((a, b) => {
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
      if (this.doesIdExist) {
        this.newUser = response;
      }
    });
  }
}