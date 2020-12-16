import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifybookComponent } from './modifybook.component';

describe('ModifybookComponent', () => {
  let component: ModifybookComponent;
  let fixture: ComponentFixture<ModifybookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifybookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
