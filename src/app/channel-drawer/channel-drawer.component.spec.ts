import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelDrawerComponent } from './channel-drawer.component';

describe('ChannelDrawerComponent', () => {
  let component: ChannelDrawerComponent;
  let fixture: ComponentFixture<ChannelDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
