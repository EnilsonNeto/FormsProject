import { Component, EventEmitter, Inject, OnInit, Output, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlternativeQuestionnarieDto } from '@shared/service-proxies/alternatives-questionnarie/alternatives-questionnarie-dto';
import { AlternativeQuestionnarieServiceProxy } from '@shared/service-proxies/alternatives-questionnarie/alternatives-questionnarie-service-proxy';

@Component({
  selector: 'app-edit-alternative',
  templateUrl: './edit-alternative.component.html',
  styleUrls: ['./edit-alternative.component.css']
})
export class EditAlternativeComponent implements OnInit {
  
    saving = false;
    alternativeQuestionnarie = new AlternativeQuestionnarieDto();
    checkedRolesMap: { [key: string]: boolean } = {};
    id: string;
    @Output() onSave = new EventEmitter<any>();

    alternativeQuestionnarieId: any;
    alternativeQuestionnarieTitle: any;
    alternativeQuestionnarieValue: any;
    alternativeQuestionnarieType: any;
    alternativeQuestionnarieIdByFormula: any;
    alternativeQuestionnarieQuestionId: any;
  
    constructor(
      injector: Injector,
      public _alternativeQuestionnarieService: AlternativeQuestionnarieServiceProxy,
      public bsModalRef: BsModalRef,
      @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef: MatDialogRef<EditAlternativeComponent>
    ) {}
  
    ngOnInit(): void {
  
      this.alternativeQuestionnarieId = this.data.alternativeQuestionnarieId;
      this.alternativeQuestionnarieTitle = this.data.alternativeQuestionnarieTitle;
      this.alternativeQuestionnarieValue = this.data.alternativeQuestionnarieValue;
      this.alternativeQuestionnarieType = this.data.alternativeQuestionnarieType;
      this.alternativeQuestionnarieIdByFormula = this.data.alternativeQuestionnarieIdByFormula;
      this.alternativeQuestionnarieQuestionId = this.data.alternativeQuestionnarieQuestionId;
      
  
      this.alternativeQuestionnarie.id = this.alternativeQuestionnarieId; 
    }
  
    save(): void {
      this.alternativeQuestionnarie.title = this.alternativeQuestionnarieTitle;
      this.alternativeQuestionnarie.value = this.alternativeQuestionnarieValue;
      this.alternativeQuestionnarie.type = this.alternativeQuestionnarieType;
      this.alternativeQuestionnarie.questionId = this.alternativeQuestionnarieQuestionId;
      
      this._alternativeQuestionnarieService.get(this.alternativeQuestionnarie.id).subscribe(
        (existingalternativeQuestionnarie) => {
          if (existingalternativeQuestionnarie) {
            this._alternativeQuestionnarieService.update(this.alternativeQuestionnarie).subscribe(() => {
              this.bsModalRef.hide();
            });
          } else {
            this._alternativeQuestionnarieService.create(this.alternativeQuestionnarie).subscribe(() => {
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