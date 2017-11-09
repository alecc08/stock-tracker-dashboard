import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGraphPageComponent } from './stock-graph-page.component';

describe('StockGraphPageComponent', () => {
  let component: StockGraphPageComponent;
  let fixture: ComponentFixture<StockGraphPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockGraphPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockGraphPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
