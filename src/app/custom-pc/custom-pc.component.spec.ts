import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPcComponent } from './custom-pc.component';

describe('CustomPcComponent', () => {
  let component: CustomPcComponent;
  let fixture: ComponentFixture<CustomPcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
