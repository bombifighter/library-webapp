import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NopermissionComponent } from './nopermission.component';

describe('NopermissionComponent', () => {
  let component: NopermissionComponent;
  let fixture: ComponentFixture<NopermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NopermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NopermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
