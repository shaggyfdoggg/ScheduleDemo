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
  
  constructor(private _formService: UserformService, private authService: SocialAuthService, private userinfoservice: UserInfoService) {}

  ngOnInit(){
    this.GetEvents();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.setGoogleId();
      this.admin();
    });
    this.GetEvents();
  }

   admin():void{
     if(this.user.id == "111099414700493252194" ){
    this.isAdmin = true;
  }
  if(this.user.id == "111099414700493252194" ){
    this.isAdmin = true;
  }
  if(this.user.id == "111099414700493252194" ){
    this.isAdmin = true;
  }
  if(this.user.id == "111099414700493252194" ){
    this.isAdmin = true;
  }
   }


  setGoogleId():void{
    this.userinfoservice.getById(this.user.id).subscribe((response: UserInfo)=> {
      console.log(response);
    this.newUser = response;
    });
          
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
  
  
  
  
  

}
