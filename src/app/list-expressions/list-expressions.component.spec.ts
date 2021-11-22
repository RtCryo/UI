import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpressionsComponent } from './list-expressions.component';

describe('ListExpressionsComponent', () => {
  let component: ListExpressionsComponent;
  let fixture: ComponentFixture<ListExpressionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExpressionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
