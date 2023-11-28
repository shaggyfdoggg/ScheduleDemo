import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, HostListener } from '@angular/core';
import { BusinessOwner } from '../models/business-owner';
import { UserformService } from '../services/userform.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  user: SocialUser = {} as SocialUser;
  currentOwner: BusinessOwner ={} as BusinessOwner;
  loggedIn: boolean = false;
  isScrolled: boolean = false;
  isAdmin: boolean = false;
  isOwner: boolean = false;
  doesIdExist: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  constructor(private authService: SocialAuthService, private formService: UserformService) { }

  ngOnInit(): void {
    
    this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        this.doesThisPersonExist();
        this.admin();
    });

  }


  doesThisPersonExist(): void {
    this.formService.getOneBusiness(this.user.id).subscribe((response: BusinessOwner) => {
      this.currentOwner = response;
      console.log(this.currentOwner);
      if(this.currentOwner != null){
        this.isOwner = true;
      }
      else{
        this.isOwner = false;
      }
      
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
    else{
      this.isAdmin = false;
    }
  }
  
  



  signOut(): void {
    this.authService.signOut();
    this.isAdmin = false;
    this.isOwner = false;
    }   

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
