import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDropdownPanelComponent } from './generic-dropdown-panel.component';

describe('GenericDropdownPanelComponent', () => {
  let component: GenericDropdownPanelComponent;
  let fixture: ComponentFixture<GenericDropdownPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericDropdownPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDropdownPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
