import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuellenComponent } from './quellen.component';

describe('QuellenComponent', () => {
  let component: QuellenComponent;
  let fixture: ComponentFixture<QuellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuellenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
