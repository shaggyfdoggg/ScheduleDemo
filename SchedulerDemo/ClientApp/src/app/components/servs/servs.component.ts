import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { BusinessOwner } from 'src/app/models/business-owner';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';
import { UserformService } from 'src/app/services/userform.service';

@Component({
  selector: 'app-servs',
  templateUrl: './servs.component.html',
  styleUrls: ['./servs.component.css']
})
export class ServsComponent {
  
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  listOfServices: Service[] = [];
  currentService: Service = {} as Service;
  owner: BusinessOwner = {} as BusinessOwner;
  doesIdExist: boolean = false;
  constructor(private authService: SocialAuthService, private servService: ServiceService, private eventService: UserformService) {}

    ngOnInit() {
  
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        this.getListofServicesForThisBusiness(this.user.id);
      }); 
      }

      newService(serv:Service): void{
        serv.businessGoogleId = this.user.id;
        serv.minutesLong = serv.minutesLong.toString();
        console.log(serv, "service prior to adding it to database")
        this.servService.addService(serv).subscribe((response:Service)=> {
          console.log(this.currentService, "Saved to currentService");
          this.currentService = response;
          this.listOfServices.push(this.currentService);
          this.currentService = {} as Service;
        });
        this.getListofServicesForThisBusiness(this.user.id);
      }

      removeService(id:number):void{
        this.servService.deleteService(id).subscribe((response:Service) => {
          console.log(response, "deleted");
          this.getListofServicesForThisBusiness(this.user.id);
        });
      }

      getListofServicesForThisBusiness(businessId: string): void{
        this.servService.getServicesByBusinessId(businessId).subscribe((response) => {
          this.listOfServices = response;
          console.log(this.listOfServices, "list has been populated");
        });
      }



      doesThisPersonExist(): void {
        this.eventService.getOneBusiness(this.user.id).subscribe((response: BusinessOwner) => {
          this.doesIdExist = (response != null); 
        });
      }

}
