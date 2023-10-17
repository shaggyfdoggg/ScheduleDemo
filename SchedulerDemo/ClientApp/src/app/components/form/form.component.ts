import { Component } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  newEvent: Userform = {} as Userform;

  constructor(private _formService: UserformService) {}

  ngOnInit(){

  }

  addingEvent():void{
    this._formService.addEvent(this.newEvent).subscribe((response: Userform) => {
      console.log(response);
    });
  }
}
