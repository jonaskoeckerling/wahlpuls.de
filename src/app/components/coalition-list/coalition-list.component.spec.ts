import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalitionListComponent } from './coalition-list.component';

describe('CoalitionListComponent', () => {
  let component: CoalitionListComponent;
  let fixture: ComponentFixture<CoalitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoalitionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoalitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
