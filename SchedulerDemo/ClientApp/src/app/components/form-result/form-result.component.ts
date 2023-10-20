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

  constructor(private _formService: UserformService, private authService: SocialAuthService, private userinfoservice: UserInfoService) {}

  ngOnInit(){
    this.doesIdExist = false;
    
    console.log("get events")
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log("setgoogleid")
      this.setGoogleId();
      this.admin();
      console.log("getevents agains")
    });
    this.GetEvents();
  }

  admin():void{
    if(this.loggedIn =true){
     if(this.user.id == "111099414700493252194" ){
    this.isAdmin = true;
  }
  if(this.user.id == "105703390204457945598" ){
    this.isAdmin = true;
  }
  if(this.user.id == "113474372826010217045" ){
    this.isAdmin = true;
  }
  if(this.user.id == "111099414700493252194" ){
    this.isAdmin = true;
  }
}
   }


  setGoogleId():void{
    this.doesThisPersonExist();
    if(this.loggedIn && this.doesIdExist == true){

      this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo)=> {
        console.log(response);
        this.newUser = response;
      });
    }
          
  }

  thisEventIsDeadToMe(id: number):void{
    this._formService.deleteEvent(id).subscribe((response: Userform)=>{
      console.log(response)
      this.GetEvents();
      return response;
    });
  }

  GetEvents(): Userform[] {
    this._formService.getAll().subscribe((response: Userform[]) => {
      console.log(response);
      this.list = response.sort((a, b) => {
        const dateA = a.dateTime instanceof Date ? a.dateTime : new Date(a.dateTime);
        const dateB = b.dateTime instanceof Date ? b.dateTime : new Date(b.dateTime); 
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {        
          return 0; 
        }  
        return dateA.getTime() - dateB.getTime();
      });
    });
  
    return this.list;
  }
  
  
  
  doesThisPersonExist():void{
    console.log("do I exist")
      this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo)=> {
        console.log(response);
        if(response != null){
          this.doesIdExist = true;
          this.newUser = response;
    }
    else {
      this.doesIdExist = false;
    }
  
        });
    }
  

}
