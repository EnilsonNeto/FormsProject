import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentQuestionnariesComponent } from './content-questionnaries.component';

describe('ContentQuestionnariesComponent', () => {
  let component: ContentQuestionnariesComponent;
  let fixture: ComponentFixture<ContentQuestionnariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentQuestionnariesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentQuestionnariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
