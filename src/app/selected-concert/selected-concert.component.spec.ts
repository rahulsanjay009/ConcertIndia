import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedConcertComponent } from './selected-concert.component';

describe('SelectedConcertComponent', () => {
  let component: SelectedConcertComponent;
  let fixture: ComponentFixture<SelectedConcertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedConcertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedConcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
