import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewborrowComponent } from './newborrow.component';

describe('NewborrowComponent', () => {
  let component: NewborrowComponent;
  let fixture: ComponentFixture<NewborrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewborrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewborrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
