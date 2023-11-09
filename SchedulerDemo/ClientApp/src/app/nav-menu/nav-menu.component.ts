import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  isScrolled: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    
    this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        
    });
  }

  signOut(): void {
    this.authService.signOut();
    }   

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
