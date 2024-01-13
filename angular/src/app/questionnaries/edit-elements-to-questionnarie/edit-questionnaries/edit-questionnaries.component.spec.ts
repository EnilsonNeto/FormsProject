import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionnariesComponent } from './edit-questionnaries.component';

describe('EditQuestionnariesComponent', () => {
  let component: EditQuestionnariesComponent;
  let fixture: ComponentFixture<EditQuestionnariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionnariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionnariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
