import { Component, EventEmitter, Inject, OnInit, Output, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuestionDto } from '@shared/service-proxies/question/question-dto';
import { QuestionServiceProxy } from '@shared/service-proxies/question/question-service-proxy';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  saving = false;
  question = new QuestionDto();
  checkedRolesMap: { [key: string]: boolean } = {};
  id: string;
  @Output() onSave = new EventEmitter<any>();
  questionId: any;
  questionTitle: any;
  questionDescription: any;
  questionFormula: any;
  questionIdByFormula: any;
  questionSection: any;

  constructor(
    injector: Injector,
    public _questionService: QuestionServiceProxy,
    public bsModalRef: BsModalRef,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditQuestionComponent>
  ) {}

  ngOnInit(): void {
    this.questionId = this.data.questionId;
    this.questionTitle = this.data.questionTitle;
    this.questionDescription = this.data.questionDescription;
    this.questionFormula = this.data.questionFormula;
    this.questionIdByFormula = this.data.questionIdByFormula;
    this.questionSection = this.data.questionSection;
    

    this.question.id = this.questionId; 
  }

  save(): void {
    this.question.title = this.questionTitle;
    this.question.description = this.questionDescription;
    this.question.formula = this.questionFormula;
    this.question.idByFormula = this.questionIdByFormula;
    this.question.sectionId = this.questionSection;
    
    this._questionService.get(this.question.id).subscribe(
      (existingquestion) => {
        if (existingquestion) {
          this._questionService.update(this.question).subscribe(() => {
            this.bsModalRef.hide();
          });
        } else {
          this._questionService.create(this.question).subscribe(() => {
            this.bsModalRef.hide();
          });
        }
      },
      (error) => {
        console.error("Error fetching body part:", error);
      }
    );
  }
}