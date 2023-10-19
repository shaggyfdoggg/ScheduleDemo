import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  user: SocialUser = {} as SocialUser;
 loggedIn: boolean = false;
constructor(private authService: SocialAuthService) { }

ngOnInit(): void {

	this.authService.authState.subscribe((user) => {
  	this.user = user;
  	this.loggedIn = (user != null);
	});
}
}
