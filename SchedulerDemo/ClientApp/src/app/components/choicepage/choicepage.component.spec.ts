import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicepageComponent } from './choicepage.component';

describe('ChoicepageComponent', () => {
  let component: ChoicepageComponent;
  let fixture: ComponentFixture<ChoicepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoicepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoicepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
