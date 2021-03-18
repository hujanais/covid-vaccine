import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedGraphComponent } from './animated-graph.component';

describe('AnimatedGraphComponent', () => {
  let component: AnimatedGraphComponent;
  let fixture: ComponentFixture<AnimatedGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
