import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideScrollerMainComponent } from './side-scroller-main.component';

describe('SideScrollerMainComponent', () => {
  let component: SideScrollerMainComponent;
  let fixture: ComponentFixture<SideScrollerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideScrollerMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideScrollerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
