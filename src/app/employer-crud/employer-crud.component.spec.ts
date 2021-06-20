import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerCrudComponent } from './employer-crud.component';

describe('EmployerCrudComponent', () => {
  let component: EmployerCrudComponent;
  let fixture: ComponentFixture<EmployerCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
