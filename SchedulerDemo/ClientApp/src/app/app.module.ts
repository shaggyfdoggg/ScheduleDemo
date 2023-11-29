import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './components/form/form.component';
import { FormResultComponent } from './components/Admin/Admin.component';
import { AboutComponent } from './components/about/about.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayComponent } from './components/day/day.component';
import { BusinessOwnerFormComponent } from './components/business-owner-form/business-owner-form.component';
import { ChoicepageComponent } from './components/choicepage/choicepage.component';
import { ConfirmationComponent } from './components/confirmation-business-info/confirmation.component';
import { ServsComponent } from './components/servs/servs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FormComponent,
    FormResultComponent,
    AboutComponent,
    CalendarComponent,
    DayComponent,
    BusinessOwnerFormComponent,
    ChoicepageComponent,
    ConfirmationComponent,
    ServsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'event-list', component: FormResultComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'business-owner-form', component: BusinessOwnerFormComponent },
      { path: 'new-event', component: FormComponent},
      { path: 'confirmation', component: ConfirmationComponent}
    ])
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '571271558088-sp5it7een11tm75ipmvkb1eikkshk1es'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
