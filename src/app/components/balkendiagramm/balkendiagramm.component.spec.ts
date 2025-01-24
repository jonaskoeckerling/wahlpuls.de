import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalkendiagrammComponent } from './balkendiagramm.component';

describe('BalkendiagrammComponent', () => {
  let component: BalkendiagrammComponent;
  let fixture: ComponentFixture<BalkendiagrammComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalkendiagrammComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalkendiagrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
