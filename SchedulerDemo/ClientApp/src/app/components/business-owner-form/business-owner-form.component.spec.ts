import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnerFormComponent } from './business-owner-form.component';

describe('BusinessOwnerFormComponent', () => {
  let component: BusinessOwnerFormComponent;
  let fixture: ComponentFixture<BusinessOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessOwnerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
