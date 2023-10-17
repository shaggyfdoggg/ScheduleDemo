import { Component } from '@angular/core';
import { Userform } from 'src/app/models/userform';
import { UserformService } from 'src/app/services/userform.service';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.css']
})
export class FormResultComponent {

  constructor(private _formService: UserformService) {}

  ngOnInit(){
    this.GetEvents();
  }
  
  list: Userform[] = {} as Userform [];

  GetEvents():Userform[]{
    this._formService.getAll().subscribe((response: Userform[]) =>{
      console.log(response);
      this.list = response;
    })
    return this.list;
  }
}
