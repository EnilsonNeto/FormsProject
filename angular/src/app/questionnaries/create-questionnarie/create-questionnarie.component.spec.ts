import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionnarieComponent } from './create-questionnarie.component';

describe('CreateQuestionnarieComponent', () => {
  let component: CreateQuestionnarieComponent;
  let fixture: ComponentFixture<CreateQuestionnarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuestionnarieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionnarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
