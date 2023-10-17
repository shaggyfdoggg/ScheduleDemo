import { Component, EventEmitter, Output } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent {
  e: Userform = {} as Userform;
  eventList: Userform[] = []

//  @Output() eventCreated = new EventEmitter<Userform>();

  constructor(private _formService: UserformService) {}

  ngOnInit(){

  }

  addingEvent(newEvent: Userform):void{
    this._formService.addEvent(newEvent).subscribe((response: Userform) => {
      console.log(response);
      this.eventList.push(response);
    });
    
  }

  // CreateEvent(){
  // this.eventCreated.emit(this.e);
  // }
}
