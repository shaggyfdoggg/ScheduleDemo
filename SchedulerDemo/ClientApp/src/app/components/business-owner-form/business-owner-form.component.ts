import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info';
import { Userform } from 'src/app/models/userform';
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserformService } from 'src/app/services/userform.service';

@Component({
  selector: 'app-business-owner-form',
  templateUrl: './business-owner-form.component.html',
  styleUrls: ['./business-owner-form.component.css']
})
export class BusinessOwnerFormComponent {

    events: Userform[] = [];
    user: SocialUser = {} as SocialUser;
    loggedIn: boolean = false;
    doesIdExist: boolean = false;
    newUser: UserInfo = {} as UserInfo;
  
    constructor(
      private eventService: UserformService,    
      private authService: SocialAuthService,
      private userinfoservice: UserInfoService
      ) {}
  
    ngOnInit() {
  
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        this.setGoogleId();
      });
      }
  
  setGoogleId(): void {
      this.doesThisPersonExist();
    }
  
    doesThisPersonExist(): void {
      this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo) => {
        this.doesIdExist = response != null;
        if (this.doesIdExist) {
          this.newUser = response;
        }
      });
    }
  
  addBusinessOwner(newBusinessOwner: ): void{

  }
}
