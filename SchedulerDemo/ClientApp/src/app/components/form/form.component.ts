import { Component, EventEmitter, Output } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent {
  e: Userform = {} as Userform;
  eventList: Userform[] = [];
  user: SocialUser = {} as SocialUser;
 loggedIn: boolean = false;

//  @Output() eventCreated = new EventEmitter<Userform>();

  constructor(private _formService: UserformService, private authService: SocialAuthService) {}

  ngOnInit(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  addingEvent(newEvent: Userform):void{
    newEvent.firstName = this.user.firstName;
    newEvent.lastName = this.user.lastName;
    this._formService.addEvent(newEvent).subscribe((response: Userform) => {
      console.log(response);
      this.eventList.push(response);
    });
    this.e = {} as Userform;
  }

  // CreateEvent(){
  // this.eventCreated.emit(this.e);
  // }
}
