import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountPageComponent } from './manage-account-page.component';

describe('ManageAccountPageComponent', () => {
  let component: ManageAccountPageComponent;
  let fixture: ComponentFixture<ManageAccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
