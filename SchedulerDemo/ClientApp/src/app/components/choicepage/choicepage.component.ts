import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { BusinessOwner } from 'src/app/models/business-owner';
import { UserformService } from 'src/app/services/userform.service';

@Component({
  selector: 'app-choicepage',
  templateUrl: './choicepage.component.html',
  styleUrls: ['./choicepage.component.css']
})
export class ChoicepageComponent {

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
 list:BusinessOwner[] = [];
 doesIdExist:boolean = false;
constructor(private authService: SocialAuthService, private userinfoservice: UserformService) { }

ngOnInit(): void {

 this.authService.authState.subscribe((user) => {
   this.user = user;
   this.loggedIn = (user != null);
   this.doesThisPersonExist();
 });
}

doesThisPersonExist(): void {
   this.userinfoservice.getOneBusiness(this.user.id).subscribe((response: BusinessOwner) => {
     this.doesIdExist = (response != null); 
   });
 }
 
}

