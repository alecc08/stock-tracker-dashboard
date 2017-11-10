import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePortfolioPageComponent } from './manage-portfolio-page.component';

describe('ManagePortfolioPageComponent', () => {
  let component: ManagePortfolioPageComponent;
  let fixture: ComponentFixture<ManagePortfolioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePortfolioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePortfolioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
