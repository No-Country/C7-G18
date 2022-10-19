import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPetComponent } from './dialog-pet.component';

describe('DialogPetComponent', () => {
  let component: DialogPetComponent;
  let fixture: ComponentFixture<DialogPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
