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
 //currentDate: Date = new Date;
  pastEventList: Userform[] =[];
  deletedEvents: Userform = {} as Userform;

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
      this.deletePastEvents();
      
      // Introduce a 2-second delay before calling GetEvents
    });
    setTimeout(() => {
      this.GetEvents();
    }, 500); // 2000 milliseconds = 2 seconds
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

  deletePastEvents(): void {
    let pastDate = new Date();
    let fourteenDaysAgo = new Date(pastDate.getTime() - 14 * 24 * 60 * 60 * 1000);
  
    this._formService.getAll().subscribe((response: Userform[]) => {
      this.pastEventList = response;
      console.log("Past Events:", this.pastEventList);

      for (let e of this.pastEventList) {
        let newNewNewDate = new Date(e.dateTime);
        let newDate = newNewNewDate.getTime();
        e.dateTime = new Date(newDate);
        console.log("Event Date:", e.dateTime);
        console.log("Fourteen Days Ago:", fourteenDaysAgo);
        
        if (e.dateTime < fourteenDaysAgo) {
          console.log("Deleting event?");
          this._formService.deleteEvent(e.id).subscribe((response: Userform) => {
            this.deletedEvents = response;
            console.log("Deleted Event:", this.deletedEvents);
          });
        }
      }
    });
  }
  

// deletePastEvents(): void{
// let pastDate = new Date();
// let fourteenDaysAgo = new Date(pastDate.getTime() - 14 * 24 * 60 * 60 * 1000);

//   this._formService.getAll().subscribe((response:Userform[]) => {
//       this.pastEventList = response;

//   });
//   for(let e of this.pastEventList){
//     let newNewDate: Date = new Date(e.dateTime);
//     if(newNewDate < fourteenDaysAgo)
//     {
//       console.log("deleting event?");
//     this._formService.deleteEvent(e.id).subscribe((response:Userform) => {
//     this.deletedEvents = response;
//     });
//   }
//   }
//   }


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