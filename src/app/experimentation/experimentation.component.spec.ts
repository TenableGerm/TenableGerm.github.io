import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentationComponent } from './experimentation.component';

describe('ExperimentationComponent', () => {
  let component: ExperimentationComponent;
  let fixture: ComponentFixture<ExperimentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperimentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
