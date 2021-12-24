import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustompcdetailsComponent } from './custompcdetails.component';

describe('CustompcdetailsComponent', () => {
  let component: CustompcdetailsComponent;
  let fixture: ComponentFixture<CustompcdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustompcdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustompcdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
