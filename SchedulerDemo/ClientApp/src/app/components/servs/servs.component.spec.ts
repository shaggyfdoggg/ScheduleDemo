import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServsComponent } from './servs.component';

describe('ServsComponent', () => {
  let component: ServsComponent;
  let fixture: ComponentFixture<ServsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
