import { Component } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.css']
})
export class FormResultComponent {

  user: SocialUser = {} as SocialUser;
 loggedIn: boolean = false;

  constructor(private _formService: UserformService, private authService: SocialAuthService) {}

  ngOnInit(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.GetEvents();
  }

  list: Userform[] = [];

  GetEvents():Userform[]{
    this._formService.getAll().subscribe((response: Userform[]) =>{
      console.log(response);
      this.list = response;
    })
    return this.list;
  }
}
