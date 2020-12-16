import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifymemberComponent } from './modifymember.component';

describe('ModifymemberComponent', () => {
  let component: ModifymemberComponent;
  let fixture: ComponentFixture<ModifymemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifymemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifymemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
